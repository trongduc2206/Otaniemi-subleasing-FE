import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, notification } from "antd";
import {RequestGet, RequestPost} from '../services/apiRequest.js';
import Header from "../../Header";
import ApartmentTypeButton from "./apartmentTypeButton";
import DefaultCheckBox from "./defaultCheckBox";
import DefaultRadioButtonGroup from "./defaultRadioButtonGroup";
import '../../styles/createOffer.css';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const offerArea = ["Maininkitie 4", 
                  "Servin maijan tie 8",
                  "Servin maijan tie 6",
                  "Servin maijan tie 10",
                  "Otakaari 18",
                  "Otaranta 8",
                  "Rantaharju 10",
                  "Jämeräntaival 11",
                  "Karstulantie 8",
                  "Matinniitynkuja 4",
                  "Tuuliniitty 1",
                  "Nuottakuninkaantie 5",
                  "Pronssitie 2",
                  "Metsalinnureitti 1"
                  ]
const offerDescription = ["Nice spacious apartment, The room is equipped with everything from kitchen supplies to work desk utilities. A kitchen and two washrooms are shared with two other rooms.",
                      "The apartment is of private housing and It is in a two room apartment (with a living room) and only my room is available (only one person allowed). The kitchen and Bathroom is well spacious. There are vaccum cleaner and microwave available also which you can use. The rent will be counted from the day you move in. Dm me for more info.",
                      "The room is fully furnished, and you'll share a fully equipped kitchen and bathroom (we have our own washing machine!) with my wonderful housemate ✨ (female only)",
                      "Hi! Our lovely flatmate has finished his eramus so we are looking for a new flatmate. It's a furnished room in a semidetached in a international LGBTQI+friendly and supercool 3-room house with terrace, sauna, big livingroom, two bathrooms, big common area and all cookware.",
                      "The apartment faces a serene view of trees, the house is usually quiet and peaceful. If it sounds like a place where you would like to live, kindly dm.",
                      "'m looking for a responsible tenant who appreciates plants (we have lots!). If interested, send me a message, and we can discuss further!",
                      "There’s a kitchen with all supplies, a balcony and two bathrooms and since it’s HOAS you will get access to laundry room, sauna with rooftop terrace and a club room. ",
                      "About the house. The kitchen has all required elements: from plates, forks, microwave, coffeemaker, grill, juicer, dishwasher and everything you might need. No need to bring anything. The living room has a big sofa and TV. The house has a small garden, our own sauna and a laundry room with washing-drying machine as well as a storage space. The room is a bit small but it has a big closet, otherwise it’s unfurnished (around 9sqm), but the common space is big."]
const RadioButton = (props) =>{
  const [isActive, setIsActive] = useState(null);
  const [navClass, setNavClass] = useState("radioButton");

  const apartmentType = [
    { type: 0,
      buttonLabel: 'Single Room Apartment' },
    { type: 1,
      buttonLabel: 'Double Room Apartment' },
    { type: 2,
      buttonLabel: 'Room in a shared Apartment' },
    { type: 3,
      buttonLabel: 'Studio' }
  ]; 
    const handleButtonSelect = (current) => {
      props.setApartmentType(current.type);
      setIsActive(current.buttonLabel)
  };

  return (
      <>
        {apartmentType.map((current) => (
                <ApartmentTypeButton key={current.type} 
                buttonLabel={current.buttonLabel} 
                selected={current.buttonLabel === isActive} 
                onSelect={() => handleButtonSelect(current)} />
        ))}
      </>
  )
}

class CreateOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //user info
      userId: "",
      //required attributes
      apartmentType: "null",
      monthlyPrice: "0",
      address: "null",
      //optional
      startDate: "0",
      endDate: "0",
      postCode: "",
      description:"",
      apartmentFloorArea: "",
      furnished: false,
      laundry: false,
      deposit: false,
      // neighborhood: "",
      // city: "",

      isActive: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleApiRequest = this.handleApiRequest.bind(this);
  }
  
  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({[target.name]: target.value});
  }

  async handleApiRequest(type, path, value, responseValueName, secondPath){
    console.log("type:", type)
    if(type === "GET"){
        return await RequestGet(path, value)
    } else {
        RequestPost(path, value,responseValueName, secondPath)
    }
  }

    render() {

      if(localStorage.getItem('user') !== undefined) {
        console.log(JSON.parse(localStorage.getItem('user')))
      } else {
        window.location.replace(`/login`)
      }

      const setApartmentType = (apartmentTypeNum) => {
        let apartmentType = this.state.apartmentType;
        console.log("apartmentType, apartmentTypeNum:",apartmentType, apartmentTypeNum);
        apartmentType = apartmentTypeNum;
        console.log(apartmentType);
        this.setState({apartmentType})
      };
      const handleFurnishedToggle = (isChecked) => {
          console.log(isChecked);
          this.setState({furnished: !isChecked});
      };
      const handleLaundryToggle = (isChecked) => {
        console.log(isChecked);
        this.setState({laundry: !isChecked});
      };
      const handleDepositToggle = (isChecked) => {
        console.log(isChecked);
        this.setState({deposit: !isChecked});
      };
      const onSubmit = async (event) => {
          event.preventDefault();
          const user = JSON.parse(localStorage.getItem('user'));
          const userId = user.id;
          const area = this.state.address;
          const {monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode } = this.state;
          console.log("area, monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode, furnished, laundry, deposit:",area, monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode )
          let furnished = this.state.furnished;
          let laundry = this.state.laundry;
          let deposit = this.state.deposit;
          if(area == "null") {
            notification.error({
                message: 'Submssion Failed',
                description: "Provide address"
            })
            return
          } else if( monthlyPrice == "0") {
            notification.error({
              message: 'Submssion Failed',
              description: "Provide price"
          })
            return
          }else if( apartmentType == "null") {
            notification.error({
                message: 'Submssion Failed',
                description: "Provide apartment type"
            })
            return
            }
          if(startDate == "0" || endDate == "0"){
            notification.error({
              message: 'Submssion Failed',
              description: "Provide date"
            })
            return
          }
          if(furnished) {
            furnished = 1
          } else { furnished = 0}
          if(deposit) {
            deposit = 1
          } else { deposit = 0}
          if(laundry) {
            laundry = 1
          } else { laundry = 0}
          await this.handleApiRequest("POST","/api/offer/create", {userId, area, monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode, furnished, laundry, deposit}) 
          // window.location.replace(`/create/published`)
      };
      const onSubmitFake = async (event) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;
        const areaNumber = getRandomNumber(1, 14)
        const area = offerArea[areaNumber];
        const monthlyPrice = getRandomNumber(150, 450)
        const apartmentType = getRandomNumber(0,3)
        const apartmentFloorArea = getRandomNumber(16, 44)
        const descriptionNumber = getRandomNumber(1, 8)
        const description = offerDescription[descriptionNumber]
        const postCode = `${getRandomNumber(0,9)}${getRandomNumber(0,9)}${getRandomNumber(0,9)}${getRandomNumber(0,9)}${getRandomNumber(0,9)}`
        const startDate = "2023-12-01";
        const endDate = "2024-05-20";
        console.log("area, monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode, furnished, laundry, deposit:",area, monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode )
        
        await this.handleApiRequest("POST","/api/offer/create", {userId, area, monthlyPrice, apartmentType, startDate, endDate, apartmentFloorArea, description, postCode}) 
    };
      return (
        <>
          <Header showBack={true}/>
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
                <input className="textInput" type="text" placeholder="Address" name="address" onChange={this.handleChange} required></input>
                <input className="textInput" type="text" placeholder="Postal code" name="postCode" onChange={this.handleChange} required></input>
                {/* <input className="textInput" type="text" placeholder="City" name="city" onChange={this.handleChange} required></input> */}
                {/* <input className="textInput" type="text" placeholder="Neighborhood" name="neighborhood" onChange={this.handleChange}></input> */}
              </div>
              <div className="apartmentTypeSelectionContainer">
                <h2 className="formSubtitle">Type</h2>
                <div className="apartmentTypeSelectionButtons">
                  <RadioButton setApartmentType={setApartmentType}/>
                </div>
              </div>
              <div className="textInputContainer">
                <h2 className="formSubtitle">Rent per month</h2>
                <input className="textInput" type="text" placeholder="Rent in euros" name="monthlyPrice" onChange={this.handleChange} required></input>
              </div>
              <div className="textInputContainer">
                <h2 className="formSubtitle">Starting</h2>
                <input className="textInput" type="date" placeholder="DD/MM/YYYY" name="startDate" onChange={this.handleChange}></input>
              </div>
              <div className="textInputContainer paddingForAdditional">
                <h2 className="formSubtitle">Ending</h2>
                <input className="textInput" type="date" placeholder="DD/MM/YYYY" name="endDate" onChange={this.handleChange} ></input>
              </div>
              <div className="textInputContainer">
                    <h2 className="aditionalSubtitle">Additional information</h2>
                    <h2 className="formSubtitle">Floor area</h2>
                    <input className="textInput" type="text" placeholder="Floor area in square meters" name="apartmentFloorArea" onChange={this.handleChange}></input>
                </div>
                <div className="textInputContainer">
                    <h2 className="formSubtitle">Description</h2>
                    <textarea className="offerDescription" type="text" placeholder="Write a description" name="description" onChange={this.handleChange}></textarea>
                </div>
                <div className="specificationsContainer">
                    <h2 className="formSubtitle">Specifications</h2>
                    <div className="checkBoxes">
                        <DefaultCheckBox isChecked={this.state.furnished} buttonLabel={"Furnished"} handleToggle={handleFurnishedToggle}/>
                        <DefaultCheckBox isChecked={this.state.laundry} buttonLabel={"Laundry room"} handleToggle={handleLaundryToggle} />
                        <DefaultCheckBox isChecked={this.state.deposit} buttonLabel={"Deposit"} handleToggle={handleDepositToggle}/>
                    </div>
                </div>
                <div className="picturesContainer">
                    <h2 className="formSubtitle">Picture</h2>
                    <div className="picturesUpload">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="100" height="100"><path d="M17.721,3,16.308,1.168A3.023,3.023,0,0,0,13.932,0H10.068A3.023,3.023,0,0,0,7.692,1.168L6.279,3Z" fill="#4d4d4d"/><circle cx="12" cy="14" r="4" fill="#4d4d4d"/><path d="M19,5H5a5.006,5.006,0,0,0-5,5v9a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V10A5.006,5.006,0,0,0,19,5ZM12,20a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,20Z" fill="#4d4d4d"/></svg>
                    </div>
                </div>
              <div className="ctaButtons">
                  <Button className="primaryButtonWide" onClick={onSubmit}>Publish</Button>
                  {/* <Button className="primaryButtonWide" onClick={onSubmitFake}>Publish</Button> */}
              </div>
            </div>
          </div>
        </>
        );
    };
};

export default CreateOffer;