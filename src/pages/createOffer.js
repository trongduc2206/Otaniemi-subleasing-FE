import React, { Component } from "react";
import Header from "../Header";
import '../styles/createOffer.css';

class CreateOffer extends Component {
    render() {
      return (
        <>
          <Header />
          <div className="createOfferMainContainer">
            <div className="createOfferForm">
              <h1 className="title">Sublease</h1>
              <p className="introduction">
                Subleasing an apartment or room is easy and completely free with Otaniemi Sublease. Just add location and choose apartment type, set a rent and renting period. To make your offer even better add pictures and complementary information.
              </p>
              <div className="dividerWrapper">
                <div className="divider"></div>
              </div>
              <h2 className="formSubtitle">Location</h2>
              <input className="textInput" type="text" placeholder="Address"></input>
              <input className="textInput" type="text" placeholder="Postal code"></input>
              <input className="textInput" type="text" placeholder="Neighborhood"></input>
              <input className="textInput" type="text" placeholder="City"></input>
            </div>
          </div>
        </>
        );
    };
};

export default CreateOffer;