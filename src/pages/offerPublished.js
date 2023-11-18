import React, { Component } from "react";
import Header from "../Header";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import '../styles/offerPublished.css';

class OfferPublished extends Component {
    render() {
      return (
        <>
            <Header />
            <div className="offerPublishedMainContainer">
                <div className="offerPublishedContent">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="46" height="46"><path d="m16.298,8.288l1.404,1.425-5.793,5.707c-.387.387-.896.58-1.407.58s-1.025-.195-1.416-.585l-2.782-2.696,1.393-1.437,2.793,2.707,5.809-5.701Zm7.702,3.712c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z" fill="#00cc00"/></svg>
                    <h1 className="title">Thank You!</h1>
                    <p className="uiText">Your offer was succesfully published.</p>
                    <div className="ctaButtons">
                        <Link to='/'>
                            <Button className="primaryButtonWide">Back to search</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
        );
    };
};

export default OfferPublished;