import React, { Component } from "react";
import OfferCard from "./OfferCard.js";
import axios from "axios";
import '../styles/offers.css';

class Offers extends Component {
    render() {
      return (
        <>
          <div className="frontPageMainContainer">
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
            <OfferCard />
          </div>
        </>
        );
    }
}

export default Offers;