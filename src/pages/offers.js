import React, { Component, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import {
    Button,
    notification,
  } from 'antd';
import '../styles/offers.css';
import mainImage from './image1.png';
import clockIcon from './clock.svg';

const baseURL = "https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io";

function formatRelativeTime(timestamp) {
    const currentTime = new Date();
    const timeDifference = (currentTime - new Date(timestamp));
    let timePos;
    if (timeDifference <= 0) {
        timePos = -timeDifference;
    } else { timePos = timeDifference}
    console.log(timePos);
    if (!isFinite(timeDifference)) {
        return timestamp;
    }
    // Convert the time difference to seconds
    const secondsDifference = Math.floor(timeDifference / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (secondsDifference < 60) {
    return rtf.format(-secondsDifference, 'second');
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return rtf.format(-minutesDifference, 'minute');
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return rtf.format(-hoursDifference, 'hour');
  } else {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return rtf.format(-daysDifference, 'day');
  }
}

function formatDate(dateToFormat) {
    // Split the input date into parts (month and day)
        const date = new Date(dateToFormat);
        const options = { day: 'numeric', month: 'long' };
        const formattedDate = date.toLocaleDateString('en-US', options); 
        const parts = formattedDate.split(' ');

        if (parts.length !== 2) {
        // Invalid input format
        }

        const month = parts[0];
        const day = parts[1];

        // Remove any commas or punctuation from the day part
        const cleanedDay = day.replace(/\D/g, '');

        // Convert the cleaned day to a number and check its value
        const dayNumber = parseInt(cleanedDay, 10);

        if (isNaN(dayNumber)) {
        // Invalid day part
        }

        // Determine the appropriate ordinal suffix (st, nd, rd, or th) for the day
        let ordinalSuffix;
        if (dayNumber >= 11 && dayNumber <= 13) {
        ordinalSuffix = 'th';
        } else {
        switch (dayNumber % 10) {
        case 1:
            ordinalSuffix = 'st';
            break;
        case 2:
            ordinalSuffix = 'nd';
            break;
        case 3:
            ordinalSuffix = 'rd';
            break;
        default:
            ordinalSuffix = 'th';
        }
        }

        // Combine the day with the ordinal suffix and the month
        return `${dayNumber}${ordinalSuffix} ${month}`;
    }

const OfferCard = (props) => {
    const {monthlyPrice, addressStreet, addressArea, type, floorArea, startDate, created } = props;
    const [apartmentPrice, setaApartmentPrice] = useState(props.monthlyPrice);
    const [apartmentArea, setApartmentArea] = useState(props.addressArea);
    const [apartmentStreet, setApartmentStreet] = useState(props.addressStreet);
    const [apartmentType, setApartmentType] = useState(props.type);
    const [apartmentFloorArea, setApartmentFloorArea] = useState(props.floorArea);
    const [apartmentStartDate, setApartmentStartDate] = useState(props.startDate);
    const [createdTime, setCreatedTime] = useState(props.created);

    useEffect(() => {
        setApartmentStartDate(formatDate(startDate));
      }, [startDate]);
    // useEffect(() => {
    //     setCreatedTime(formatRelativeTime(createdTime))
    // }, [createdTime]);


    return (
        <div className="Offer-Card">
            <img src={mainImage} />
            <div className="offerContent">
                <div>
                    <div>
                        <div className="locationAndPrice">
                            <div>
                                {apartmentArea}
                            </div>
                            <div>
                                {apartmentPrice}
                            </div>
                        </div>
                        <div className="billingPeriod">
                        per month
                        </div>
                    </div>
                    <div>
                        <div className="addressAndType">
                            <div className="address">
                                {apartmentStreet}
                            </div>
                            <div className="type">
                            { apartmentType ? (
                                apartmentType === 1 ? "Studio" : "Shared"
                                ) : ""
                            }
                            {apartmentFloorArea && apartmentFloorArea !== null ?
                                (`, ${apartmentFloorArea} m2`)
                                : ""  
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="availabilityAndTimeStamp">
                        <div className="availability">
                            <div className="availableWrapper">
                                <div className="available"></div>
                            </div>
                            <div>
                                {apartmentStartDate}
                            </div>
                        </div>
                        <div className="timeStamp">
                            <div>
                                <img src={clockIcon} width="16" height="16"/>
                            </div>
                            <div>
                            {formatRelativeTime(createdTime)}
                            </div>
                        </div>
                    </div>
                    <div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: {},
          username: "",
          password: "",
          error: "",
          auth: "",
          autoCompleteResult: [],
        };
        // let form = Form.useForm();
      }

    getOffers(){
        const offer = {};
        offer.page = 0;
        offer.size = 25;
          
        console.log('Received values of form: ')
        axios.get(`${baseURL}/api/offer`, { 
            params: {
                page: offer.page,
                size: offer.size,
            }}).then((response) => {
            if(response.status == "200" && response.data.status.code == "success" ){
                console.log(response.data.data);
                localStorage.setItem("content", JSON.stringify(response.data.data.content))
            } else { 
                this.setState({error: response.message})
                notification.error({
                message: 'Wrong username or password',
                description: response.data.status.message
                })
            }
        }).catch((error) => {
          console.log(this.state.error);
          notification.error({
          message: 'Login Failed',
          description: error.response
        })
        }
        );
      };

    render() {
        this.getOffers();
        const contentOf = JSON.parse(localStorage.getItem('content'));
        const contentOn = [
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
            { actualPrice : 123},
        ]
        console.log(contentOf, contentOf[0].actualPrice, contentOf[0].apartmentType )
        
      return (
        <>
          <div className="frontPageMainContainer">
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
                : (<div className=""></div>)
            }           
          </div>
        </>
        );
    }
}

export default Offers;