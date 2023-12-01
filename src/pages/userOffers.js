import React, { Component, useState} from "react";
import OfferCard from "./offerCard.js";
import { useParams } from "react-router";
import FilteringModal from "./filteringModal.js";
import Header from "../Header.js";
import {RequestGet, RequestPost, RequestDelete} from './services/apiRequest.js';
import { Link } from 'react-router-dom';
import {
    Button,
    Modal,
    Slider,
    Pagination,
  } from 'antd';
import '../styles/offers.css';

class UserOffers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            isModalOpen: false,
            page: 0,
            size: 25,
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
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id;
        const {page, size} = this.state; 
        console.log("ComponentDidMount")
        const {content, totalElements} = await RequestGet("/api/offer/manage", {page, size, userId})
        this.setState({ user, content, totalElements })
    }

    async handleApiRequest(type, path, value, responseValueName, secondPath){
        console.log("type:", type)
        if(type === "GET"){
            return await RequestGet(path, value)
        } else if (type === "DELETE"){ 
            return await RequestDelete(path, value)
        } else {
            RequestPost(path, value,responseValueName, secondPath)
        }
    }

    render() {
        let contentOf = this.state.content;
        console.log("content: ", contentOf)

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
        
        const onDelete = async (props) => {
            // event.preventDefault();
            const offerId = props.offerID;
            console.log("offerId",offerId);
            const page = 0;
            const {size} = this.state; 
            await this.handleApiRequest("DELETE",`/api/offer/${offerId}`)
            window.location.reload();
        };

      return (
          <>
          <Header className="Header" showBack={true}/> 
          <div className="frontPageMainContainer">
              {
                  contentOf && contentOf.length > 0 ? (
                      <div className="wrapCardContainer">
                          <div className="cardContainer">
                              { contentOf && contentOf.length > 0 ? (
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
                                                  deleteOffer={true}
                                                  onDelete={onDelete}
                                              />)})
                                  )
                                  : (
                                      <>
                                      </>
                                      // <div className="emptyOfferContainer">
                                      //     <h1 style={{color: '#FF3377'}}>You have not have any offer yet!</h1>
                                      // </div>
                                  )
                              }
                          </div>
                      </div>
                  ) : (
                      <div className="emptyOfferContainer">
                          <h1 >You have not have any offer yet!</h1>
                          <a style={{color: '#FF3377'}} href="/create">Create an offer</a>
                      </div>
                  )
              }
            {/*<div className="wrapCardContainer">*/}
            {/*    <div className="cardContainer">*/}
            {/*    { contentOf && contentOf.length > 0 ? (*/}
            {/*        contentOf.map((object) => {*/}
            {/*            return (*/}
            {/*                <OfferCard*/}
            {/*                key={object.offerId}*/}
            {/*                monthlyPrice={object.monthlyPrice}*/}
            {/*                addressArea={object.area}*/}
            {/*                addressStreet={object.address}*/}
            {/*                type={object.apartmentType}*/}
            {/*                floorArea={object.apartmentFloorArea}*/}
            {/*                startDate={object.startDate}*/}
            {/*                created={object.createdTime}*/}
            {/*                offerID={object.offerId}*/}
            {/*                deleteOffer={true}*/}
            {/*                onDelete={onDelete}*/}
            {/*                />)})*/}
            {/*            )*/}
            {/*            : (*/}
            {/*                <div className="emptyOfferContainer">*/}
            {/*                    <h1 style={{color: '#FF3377'}}>You have not have any offer yet!</h1>*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*    }    */}
            {/*    </div>       */}
            {/*</div>*/}
              {
                  contentOf && contentOf.left > 0 ? (
                      <div className="pagination">
                          <Pagination defaultCurrent={1} total={this.state.totalElements} pageSize={this.state.size} onChange={onPageChange} />
                      </div>
                  ) : (
                      <></>
                  )
              }

          </div>
        </>
        );
    }
}

export default UserOffers;