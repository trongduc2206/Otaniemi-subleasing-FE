import React, { Component } from "react";
import OfferCard from "./OfferCard.js";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/offers.css';

class Offers extends Component {
    render() {
      return (
        <>
          <div className="frontPageMainContainer">
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          <Link to='/item'>
            <OfferCard />
          </Link>
          </div>
        </>
        );
    }
}

export default Offers;