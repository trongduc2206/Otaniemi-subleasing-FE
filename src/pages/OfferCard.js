import React from 'react';
import mainImage from './image1.png';
import clockIcon from './clock.svg';
import './OfferCard.css';

const OfferCard = () => {
    return (
        <div className="Offer-Card">
            <img src={mainImage} />
            <div className="offerContent">
                <div>
                    <div>
                        <div className="locationAndPrice">
                            <div>
                            Otaniemi, Espoo
                            </div>
                            <div>
                            459 €
                            </div>
                        </div>
                        <div className="billingPeriod">
                        per month
                        </div>
                    </div>
                    <div>
                        <div className="addressAndType">
                            Servin Maijan tie 3
                        </div>
                        <div className="addressAndType">
                            Studio, 24 m2
                        </div>
                    </div>
                </div>
                <div>
                    <div className="availabilityAndTimeStamp">
                        <div className="availability">
                            <div className="availableWrapper">
                                <div className="available"></div>
                            </div>
                            <div>15th October</div>
                        </div>
                        <div className="timeStamp">
                            <div>
                                <img src={clockIcon} width="16" height="16"/>
                            </div>
                            <div>4 hours ago</div>
                        </div>
                    </div>
                    <div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;