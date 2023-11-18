import React, { Component } from "react";
import Header from "../Header";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import DefaultCheckBox from "./defaultCheckBox";
import '../styles/createOfferAdditionalInformation.css';


class CreateAdditionalInformation extends Component {
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
                    <h2 className="formSubtitle">Floor area</h2>
                    <input className="textInput" type="text" placeholder="Floor area in square meters"></input>
                </div>
                <div className="textInputContainer">
                    <h2 className="formSubtitle">Description</h2>
                    <textarea className="description" type="text" placeholder="Write a description"></textarea>
                </div>
                <div className="specificationsContainer">
                    <h2 className="formSubtitle">Specifications</h2>
                    <div className="checkBoxes">
                        <DefaultCheckBox buttonLabel={"Furnished"} />
                        <DefaultCheckBox buttonLabel={"Laundry room"} />
                        <DefaultCheckBox buttonLabel={"Deposit"} />
                    </div>
                </div>
                <div className="picturesContainer">
                    <h2 className="formSubtitle">Picture</h2>
                    <div className="picturesUpload">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="100" height="100"><path d="M17.721,3,16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L6.279,3Z" fill="#4d4d4d"/><circle cx="12" cy="14" r="4" fill="#4d4d4d"/><path d="M19,5H5a5.006,5.006,0,0,0-5,5v9a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10A5.006,5.006,0,0,0,19,5ZM12,20a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,20Z" fill="#4d4d4d"/></svg>
                    </div>
                </div>
                <div className="ctaButtons">
                    <Link to='/create/published'>
                        <Button className="primaryButtonWide">Publish</Button>
                    </Link>
                </div>
            </div>
          </div>
        </>
        );
    };
};

export default CreateAdditionalInformation;