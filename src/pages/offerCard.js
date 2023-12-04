import React, { Component, useState, useEffect } from "react";
import { Button } from "antd";
import {
    DeleteOutlined
  } from "@ant-design/icons";
import mainImage1 from '../styles/img/offersImg/image1.png';
import mainImage2 from '../styles/img/offersImg/image2.png';
import mainImage3 from '../styles/img/offersImg/image3.png';
import mainImage4 from '../styles/img/offersImg/image4.png';
import mainImage5 from '../styles/img/offersImg/image5.png';
import mainImage6 from '../styles/img/offersImg/image6.png';
import mainImage7 from '../styles/img/offersImg/image7.png';
import mainImage8 from '../styles/img/offersImg/image8.png';
import mainImage9 from '../styles/img/offersImg/image9.png';
import mainImage10 from '../styles/img/offersImg/image10.png';
import mainImage11 from '../styles/img/offersImg/image11.png';
import mainImage12 from '../styles/img/offersImg/image12.png';
import mainImage13 from '../styles/img/offersImg/image13.png';
import mainImage14 from '../styles/img/offersImg/image14.png';
import mainImage15 from '../styles/img/offersImg/image15.png';
import mainImage16 from '../styles/img/offersImg/image16.png';
import mainImage17 from '../styles/img/offersImg/image17.png';
import mainImage18 from '../styles/img/offersImg/image18.png';
import mainImage19 from '../styles/img/offersImg/image19.png';
import clockIcon from '../styles/img/clock.svg';
import { Link } from 'react-router-dom';


function formatRelativeTime(timestamp) {
    const currentTime = new Date();
    const timeDifference = (currentTime - new Date(timestamp));
    let timePos;
    if (timeDifference <= 0) {
        timePos = -timeDifference;
    } else { timePos = timeDifference}
    // console.log(timePos);
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
    const {monthlyPrice, addressStreet, addressArea, type, floorArea, startDate, created, offerID, deleteOffer, onDelete, offerImg } = props;
    const [apartmentPrice, setApartmentPrice] = useState(props.monthlyPrice);
    const [apartmentArea, setApartmentArea] = useState(props.addressArea);
    const [apartmentStreet, setApartmentStreet] = useState(props.addressStreet);
    const [apartmentType, setApartmentType] = useState(props.type);
    const [apartmentFloorArea, setApartmentFloorArea] = useState(props.floorArea);
    const [apartmentStartDate, setApartmentStartDate] = useState(props.startDate);
    const [createdTime, setCreatedTime] = useState(props.created);
    const [apartmentImg, setApartmentImg] = useState(
        [0,
        mainImage1, 
        mainImage2, 
        mainImage3,
        mainImage4,
        mainImage5,
        mainImage6,
        mainImage7,
        mainImage8,
        mainImage9,
        mainImage10,
        mainImage11,
        mainImage12,
        mainImage13,
        mainImage14,
        mainImage15,
        mainImage16,
        mainImage17,
        mainImage18,
        mainImage19,
        ]);

    useEffect(() => {
        setApartmentStartDate(formatDate(startDate));
      }, [startDate]);
    console.log("OfferCard offerId, offerImg:",offerID, apartmentImg, offerImg, mainImage1);

    const deleteApartmentOffer = async () => {
        await onDelete({offerID});
    };

    const openOffer = async () => {
        window.location.replace(`/offers/item/${offerID}`);
    };
    return (
        <div className="Offer-Card" >
                <img className="offerCardImage" src={apartmentImg[offerImg]} alt={`Apartment Image`} onClick={openOffer}/>
                <div className="offerContent">
                    <div>
                        <div>
                            <div className="locationAndPrice cursorPointer" onClick={openOffer}>
                                <div>
                                    {apartmentArea}
                                </div>
                                <div>
                                    {apartmentPrice}
                                </div>
                            </div>
                            <div className="billingPeriod cursorPointer">
                            per month
                            </div>
                        </div>
                        <div>
                            <div className="addressAndType cursorPointer" onClick={openOffer}>
                                <div className="address" >
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
                    <div className="timeAndDelete">
                        <div className="availabilityAndTimeStamp">
                            <div className="availability cursorPointer" onClick={openOffer}>
                                <div className="availableWrapper">
                                    <div className="available"></div>
                                </div>
                                <div onClick={openOffer}>
                                    {apartmentStartDate}
                                </div>
                            </div>
                            <div className="offerTimeStamp cursorPointer" onClick={openOffer}>
                                <div>
                                    <img src={clockIcon} width="16" height="16"/>
                                </div>
                                <div>
                                {formatRelativeTime(createdTime)}
                                </div>
                            </div>
                        </div>
                        <div className="deleteOffer">
                            {deleteOffer?
                                <Button className="primaryButton" onClick={deleteApartmentOffer}>
                                    <DeleteOutlined />
                                </Button>
                                : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default OfferCard;