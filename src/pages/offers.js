import React, { Component, useState, useEffect } from "react";
import OfferCard from "./offerCard";
import Header from "../Header";
import {RequestGet, RequestPost} from './services/apiRequest.js';
import { Link } from 'react-router-dom';
import {
    Button,
    Modal,
    Slider,
    Pagination,
  } from 'antd';
import {
    CloseOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
import '../styles/offers.css';
import styles from '../styles/offers.css';

const RadioButton = (props) =>{
    const {name, type} = props;
    const [nameType, setNameType] = useState(name);
    const [apartmentType, setApartmentType] = useState(type);
    const [isActive, setIsActive] = useState(false);
    const [navClass, setNavClass] = useState("radioButton");
    let valueArray = [];
    
    const handleClick = () => {
        console.log(1,valueArray);
        const localStore = JSON.parse(localStorage.getItem('filterType'));
        console.log(1,localStore);
        // 👇️ toggle styles on click
        if (!isActive) {
            setIsActive(!isActive)
            setNavClass("radioButton selectedRadioButton")
            valueArray = JSON.parse(localStorage.getItem('filterType'))
            console.log(2,valueArray);
            valueArray = valueArray.concat([apartmentType])
            console.log(2,valueArray);
        } else {
            setIsActive(!isActive)
            setNavClass("radioButton")
            valueArray = JSON.parse(localStorage.getItem('filterType'))
            console.log(3,valueArray);
            valueArray = valueArray.filter(item => item !== apartmentType)
            console.log(3,valueArray);
        }
        console.log(4,valueArray);
        localStorage.setItem("filterType", JSON.stringify(valueArray))
        console.log(4,JSON.parse(localStorage.getItem('filterType')));
      };
    return (
        <div className={navClass} onClick={handleClick}>
                {nameType}
        </div>
    )
}

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            area: "",
            maxPrice: 1000,
            isActive: true,
            isModalOpen: false,
            page: 0,
            size: 4,
            offers: {
                page: 0,
                size: 4,
            },
            content: {},
            rangeArray: [0, 1000],
        };
        this.handleChange = this.handleChange.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }
    
    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({[target.name]: target.value});
    }

    componentDidMount() {
        // do something
        console.log("1")
        RequestGet("/api/offer", this.state.offers,"content", false)
        localStorage.setItem("filterType", JSON.stringify([]))
    }

    render() {
        const filters = {
            page: this.state.page,
            size: this.state.size,
            priceLeq: this.state.rangeArray[1],
            priceGeq: this.state.rangeArray[0],
        };
        const contentOf = JSON.parse(localStorage.getItem('content'))
        console.log("content: ", contentOf)
        const totalElements = JSON.parse(localStorage.getItem('totalElements'));
        let pageNumber = 0;

        // const pricesArray = contentOf.map(element => element.monthlyPrice);
        // this.state.maxPrice = Math.max(...pricesArray);

        const showModal = (event) => {
            event.preventDefault();
            this.setState({isModalOpen: true});
        };
    
        const handleOk = () => {
            this.setState({isModalOpen: false});
        };
    
        const handleCancel = (event) => {
            event.preventDefault();
            this.setState({isModalOpen: false});
        };
        
        const onApply = (event) => {
            const apartmentType  = JSON.parse(localStorage.getItem('filterType')).toString();
            pageNumber = 0;
            filters.page = 0; 
            filters.priceLeq = this.state.rangeArray[1];
            filters.priceGeq = this.state.rangeArray[0];
            if(this.state.area !== ""){
                filters.area= this.state.area
            }
            if(apartmentType !== ""){
                filters.apartmentType = apartmentType;
            }
            console.log(filters)
            RequestGet("/api/offer/filter", filters,"content", false)
            this.setState({content: JSON.parse(localStorage.getItem('content'))})
        };
        
        const onPageChange = (event) => {
            const apartmentType  = JSON.parse(localStorage.getItem('filterType')).toString();
            pageNumber = event;
            console.log("pageNumber: ", pageNumber)
            filters.page = pageNumber-1;
            filters.priceLeq = this.state.rangeArray[1];
            filters.priceGeq = this.state.rangeArray[0];

            if(this.state.area !== ""){
                filters.area= this.state.area
            }
            if(apartmentType !== ""){
                filters.apartmentType = apartmentType;
            }
            RequestGet("/api/offer/filter", filters,"content", false)
            this.setState({content: JSON.parse(localStorage.getItem('content'))})
        }

        // const totalElements= (event) => {
        //     event.preventDefault();
        //     this.setState({totalElements: JSON.parse(localStorage.getItem('totalElements'))})
        //     const totalElements = this.state.totalElements;
        //     return totalElements
        // }
        
      return (
          <>
          <Header className="Header" main={true} showModal={showModal}/> 
          <div className="frontPageMainContainer"> 
            <div className="wrapCardContainer">
                <Modal open={this.state.isModalOpen} onOk={handleOk} onCancel={handleCancel} width={730}>
                    <div className="filteringContainer">
                        <div className="filteringWindow">
                        <form onSubmit={onApply}>
                            <div className="filteringWidnowTitle">
                                <div className="placeholderAndClose">
                                    <div className="placeholder">
                                        <SearchOutlined /> Search for an Apartment
                                    </div>
                                </div>
                                <div className="horisontalLine">
                                    <hr color="#D9D9D9"/>  
                                </div>
                            </div>
                            <div className="locationSearch">
                                <div className="searchTitle">
                                    Location
                                </div>
                                <div className="filterfFormElement">
                                    <input className="input" placeholder="Location, City, Area" name="area" type="text" value={this.state.username} onChange={this.handleChange} />
                                    <div className="horisontalLine">
                                        <hr color="#D9D9D9"/>  
                                    </div>
                                </div>
                            </div>
                            <div className="typeSearch">
                                <div className="searchTitle">
                                    Type
                                </div>
                                <div className="apartmentSelector">
                                    <RadioButton name="Single Room Apartment" type={1} />
                                    <RadioButton name="Double Room Apartment" type={2} />
                                    <RadioButton name="Room in a shared Apartment" type={3} />
                                    <RadioButton name="Studio" type={4} />
                                </div>
                                <div className="horisontalLine">
                                    <hr color="#D9D9D9"/>
                                </div>
                            </div>
                            <div className="priceSearch">
                                <div className="searchTitle">
                                    Price
                                </div>
                                <div className="filterfFormElement">
                                <Slider range className={styles.filterSlider} onAfterChange={(value) => {this.setState({rangeArray: value}) }} defaultValue={[0, this.state.maxPrice]} max={this.state.maxPrice} min={0} />
                                    <div className="horisontalLine">
                                        <hr color="#D9D9D9"/>  
                                    </div>
                                </div>
                            </div>
                            <div className="filterfFormElement filterButton">
                                <button  className="button" type="submit">Apply</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </Modal>
                
                <div className="cardContainer">
                { contentOf ? (
                    contentOf.map((object) => {
                        return (<OfferCard
                            key={object.offerId}
                            monthlyPrice={object.monthlyPrice}
                            addressArea={object.area}
                            addressStreet={object.address}
                            type={object.apartmentType}
                            floorArea={object.apartmentFloorArea}
                            startDate={object.startDate}
                            created={object.createdTime}
                            />)
                        })
                        )
                        : (<></>)
                }    
                </div>       
            </div>
            <div className="pagination">
                <Pagination defaultCurrent={1} total={totalElements} pageSize={this.state.size} onChange={onPageChange} />
            </div>
          </div>
        </>
        );
    }
}

export default Offers;