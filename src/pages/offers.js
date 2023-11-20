import React, { Component, useState} from "react";
import OfferCard from "./offerCard";
import FilteringModal from "./filteringModal";
import Header from "../Header";
import {RequestGet, RequestPost} from './services/apiRequest.js';
import { Link } from 'react-router-dom';
import {
    Button,
    Modal,
    Slider,
    Pagination,
  } from 'antd';
import '../styles/offers.css';

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            page: 0,
            size: 4,
            content: [],
            totalElements: 1,
            filters: {
                priceLeq: 1000,
                priceGeq: 0,
            },
            isSet: false,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleApiRequest = this.handleApiRequest.bind(this);
      }

    async componentDidMount() {
        // do something
        const {page, size} = this.state; 
        console.log("ComponentDidMount")
        const {content, totalElements} = await RequestGet("/api/offer", {page, size})
        this.setState({ content, totalElements })
    }

    async handleApiRequest(type, path, value, responseValueName, secondPath){
        console.log("type:", type)
        if(type === "GET"){
            return await RequestGet(path, value)
        } else {
            RequestPost(path, value,responseValueName, secondPath)
        }
    }

    

    render() {
        let contentOf = this.state.content;
        console.log("content: ", contentOf)

        const showModal = (event) => {
            event.preventDefault();
            this.setState({isModalOpen: true});
        };
        
        const handleOk = () => {
            this.setState({isModalOpen: false});
        };
    
        const handleCancel = (event) => {
            this.setState({isModalOpen: false});
        };

        const onPageChange = async (event) => {
            const pageNumber = event;
            console.log("pageNumber: ", pageNumber)
            const page = pageNumber-1;
            const {size} = this.state; 
            const filters = this.state.filters;
            const { content, totalElements } = await this.handleApiRequest("GET","/api/offer/filter", {page,size,...filters})
            console.log("contentOnPAgeChange: ",content)
            this.setState({ content, totalElements })
        }
        
        const onApply = async (filter) => {
            // event.preventDefault();
            const page = 0;
            const {size} = this.state; 
            const filters = filter;
            const isSet = true; 
            const { content, totalElements } = await this.handleApiRequest("GET","/api/offer/filter", {page,size,...filters})
            this.setState({ content, totalElements, filters, isSet, isModalOpen: false})
        };

        const onFilterClear = async (event) => {
            const {page, size} = this.state; 
            const isSet = false;
            console.log("Clear filters")
            const {content, totalElements} = await RequestGet("/api/offer", {page, size})
            this.setState({ content, totalElements, isSet })
        };


      return (
          <>
          <Header className="Header" main={true} isSet={this.state.isSet} onFilterClear={onFilterClear} showModal={showModal}/> 
          <div className="frontPageMainContainer"> 
            <div className="wrapCardContainer">
                <FilteringModal 
                    onApply={onApply} 
                    open={this.state.isModalOpen} 
                    onOK={handleOk} 
                    onCancel={handleCancel} 
                />
                <div className="cardContainer">
                { contentOf ? (
                    contentOf.map((object) => {
                        return (
                            <OfferCard
                            key={object.offerId}
                            monthlyPrice={object.monthlyPrice}
                            addressArea={object.area}
                            addressStreet={object.address}
                            type={object.apartmentType}
                            floorArea={object.apartmentFloorArea}
                            startDate={object.startDate}
                            created={object.createdTime}
                            offerID={object.offerId}
                            />)})
                        )
                        : (<></>)
                }    
                </div>       
            </div>
            <div className="pagination">
                <Pagination defaultCurrent={1} total={this.state.totalElements} pageSize={this.state.size} onChange={onPageChange} />
            </div>
          </div>
        </>
        );
    }
}

export default Offers;