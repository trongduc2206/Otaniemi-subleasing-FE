import React, { Component } from "react";
import Header from "../Header";
import ApartmentTypeButtonGroup from "./apartmentTypeButtonGroup";
import DefaultRadioButtonGroup from "./defaultRadioButtonGroup";
import { Link } from 'react-router-dom';
import { Button } from "antd";
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
              <div className="textInputContainer">
                <h2 className="formSubtitle">Location</h2>
                <input className="textInput" type="text" placeholder="Address"></input>
                <input className="textInput" type="text" placeholder="Postal code"></input>
                <input className="textInput" type="text" placeholder="Neighborhood"></input>
                <input className="textInput" type="text" placeholder="City"></input>
              </div>
              <div className="apartmentTypeSelectionContainer">
                <h2 className="formSubtitle">Type</h2>
                <div className="apartmentTypeSelectionButtons">
                <ApartmentTypeButtonGroup />
                </div>
              </div>
              <div className="textInputContainer">
                <h2 className="formSubtitle">Rent</h2>
                <input className="textInput" type="text" placeholder="Rent in euros"></input>
              </div>
              <DefaultRadioButtonGroup />
              <div className="textInputContainer">
                <h2 className="formSubtitle">Starting</h2>
                <input className="textInput" type="text" placeholder="DD/MM/YYYY"></input>
              </div>
              <div className="textInputContainer">
                <h2 className="formSubtitle">Ending</h2>
                <input className="textInput" type="text" placeholder="DD/MM/YYYY"></input>
              </div>
              <div className="ctaButtons">
                <Link to='/create/published'>
                  <Button className="primaryButtonWide">Publish</Button>
                </Link>
                <Link to='/create/additional-information'>
                  <Button className="secondaryButtonWide">Add more information</Button>
                </Link>
              </div>
            </div>
          </div>
        </>
        );
    };
};

export default CreateOffer;