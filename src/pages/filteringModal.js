import React, { Component, useState} from "react";
import {RequestGet, RequestPost} from './services/apiRequest.js';
import {
    Button,
    Modal,
    Slider,
    Pagination,
  } from 'antd';
import {
    CloseOutlined,
    SearchOutlined,
  } from "@ant-design/icons";
import styles from '../styles/offers.css';

const RadioButton = (props) =>{
    const {name, type} = props;
    const apartmentTypeNum = type;
    const nameType = name;
    const [isActive, setIsActive] = useState(false);
    const [navClass, setNavClass] = useState("radioButton");

    const handleClick = () => {
        // 👇️ toggle styles on click
        if (!isActive) {
            setIsActive(!isActive);
            setNavClass("radioButton selectedRadioButton");
            props.setApartmentType(apartmentTypeNum)
        } else {
            setIsActive(!isActive);
            setNavClass("radioButton");
            props.changeApartmentType(apartmentTypeNum);
        }
      };

    return (
        <div className={navClass} onClick={handleClick}>
                {nameType}
        </div>
    )
}

class FilteringModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxPrice: 1000,
            area: "",
            rangeArray: [0, 1000],
            apartmentType: [],
        };
        this.handleApiRequest = this.handleApiRequest.bind(this);
      }

    async handleApiRequest(type, path, value, responseValueName, secondPath){
        console.log("type:", type)
        if(type === "GET"){
            await RequestGet(path, value)
        } else {
            RequestPost(path, value,responseValueName, secondPath)
        }
    }
    
    render() {

        const setArea = (event) => {
            event.preventDefault();
            const target = event.target;
            this.setState({[target.name]: target.value});
        }

        const setApartmentType = (apartmentTypeNum) => {
            let apartmentType = this.state.apartmentType;
            console.log(2,apartmentType, apartmentTypeNum);
            apartmentType = apartmentType.concat([apartmentTypeNum])
            console.log(2,apartmentType);
            this.setState({apartmentType})
        };

        const changeApartmentType = (apartmentTypeNum) => {
            let apartmentType = this.state.apartmentType;
            console.log(3,apartmentType, apartmentTypeNum);
            apartmentType = apartmentType.filter(item => item !== apartmentTypeNum)
            console.log(3,apartmentType);
            this.setState({apartmentType})
        };

        const setRange = (rangeArray) => {
            console.log("rangeArray: ", rangeArray);
            this.setState({rangeArray})
        };

        const setFilters = (event) => {
            event.preventDefault();
            const priceLeq = this.state.rangeArray[1];
            const priceGeq = this.state.rangeArray[0];
            const apartmentType  = this.state.apartmentType.toString(); 
            const filters = {
                priceLeq,
                priceGeq
            }
            if(this.state.area !== ""){
                filters.area = this.state.area
            }
            if(apartmentType !== ""){
                filters.apartmentType = apartmentType;
            }
            console.log("filters: ",filters)
            this.props.onApply(filters);
        };

        return (
            <>
                <Modal open={this.props.open} onOk={this.props.onOk} onCancel={this.props.onCancel} width={730}>
                    <div className="filteringContainer">
                        <div className="filteringWindow">
                        <form onSubmit={setFilters}>
                            <div className="filteringWidnowTitle">
                                <div className="placeholderAndClose">
                                    <div className="placeholder">
                                        <SearchOutlined /> Search for an Apartment
                                    </div>
                                </div>
                                <div className="horisontalLine">
                                    <hr color="#D9D9D9"/>  
                                </div>
                            </div>
                            <div className="locationSearch">
                                <div className="searchTitle">
                                    Location
                                </div>
                                <div className="filterfFormElement">
                                    <input className="input" placeholder="Location, City, Area" name="area" type="text" onChange={setArea} />
                                    <div className="horisontalLine">
                                        <hr color="#D9D9D9"/>  
                                    </div>
                                </div>
                            </div>
                            <div className="typeSearch">
                                <div className="searchTitle">
                                    Type
                                </div>
                                <div className="apartmentSelector">
                                    <RadioButton setApartmentType={setApartmentType} changeApartmentType={changeApartmentType} name="Single Room Apartment" type={1} />
                                    <RadioButton setApartmentType={setApartmentType} changeApartmentType={changeApartmentType} name="Double Room Apartment" type={2} />
                                    <RadioButton setApartmentType={setApartmentType} changeApartmentType={changeApartmentType} name="Room in a shared Apartment" type={3} />
                                    <RadioButton setApartmentType={setApartmentType} changeApartmentType={changeApartmentType} name="Studio" type={4} />
                                </div>
                                <div className="horisontalLine">
                                    <hr color="#D9D9D9"/>
                                </div>
                            </div>
                            <div className="priceSearch">
                                <div className="searchTitle">
                                    Price
                                </div>
                                <div className="filterfFormElement">
                                <Slider range 
                                    className={styles.filterSlider} 
                                    onAfterChange={setRange} 
                                    defaultValue={[0, this.state.maxPrice]} 
                                    max={this.state.maxPrice} 
                                    min={0} />
                                    <div className="horisontalLine">
                                        <hr color="#D9D9D9"/>  
                                    </div>
                                </div>
                            </div>
                            <div className="filterfFormElement filterButton">
                                <button  className="filterModalButton" type="submit">Apply</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
  }

export default FilteringModal;
