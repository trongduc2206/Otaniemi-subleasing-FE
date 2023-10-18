import React, { Component } from "react";
import '../styles/itemPage.css';
import mainImage from './image 4.png';
import geo from "../styles/img/geo.svg";
import avatar from "../styles/img/avatar.svg";
import {
  ShareAltOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CheckOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";

class Item extends Component {
    render() {
      return (
        <>
          <div className="itemPageMainContainer">
            <div className="itemPageCard">
              <div className="itemPageContent">
                <div className="itemPageHeaderSection">
                  <div className="itemNameBox">
                      <div className="name">
                      Myyrmäki, Vantaa
                      </div>
                      <div className="address">
                      Mäkkylänrinne 4
                      </div>
                  </div>
                  <div className="actionsBox">
                    <div className="save action">
                      <HeartOutlined />
                      Save
                    </div>
                    <div className="mapView action">
                      <img src={ geo } />
                      Map View
                    </div>
                    <div className="share action">
                      <ShareAltOutlined />
                      Share
                    </div>
                  </div>
                </div>
                <div className="itemImgCarousel">
                  <img src={ mainImage } />
                </div>
                <div className="itemPageSubContent">
                  <div className="itemPageSubSubContent">
                    <div className="landlordAndAction">
                      <div className="landlordInfo">
                        <div className="landlordImg">
                          <img src={ avatar } />
                        </div>
                        <div className="landlordNameCheck">
                          <div className="landlordName">
                            Claudia Moretti
                          </div>
                          <div className="landlordCheck">
                            <CheckCircleOutlined />
                            Verified
                          </div>
                        </div>
                      </div>
                      <div className="contactAction">
                        Contact
                      </div>
                    </div>
                    <div className="information">
                      <div className="description">
                        <h3>Description</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla posuere. Feugiat vivamus at augue eget arcu dictum. Odio tempor orci dapibus ultrices in iaculis nunc. Non blandit massa enim nec dui nunc mattis enim ut. Rhoncus dolor purus non enim praesent elementum facilisis. Purus in massa tempor nec feugiat nisl. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Pellentesque nec nam aliquam sem et tortor consequat id. Eu scelerisque felis imperdiet proin fermentum leo vel.</p>
                      </div>
                      <div className="valuesBox">
                        <div className="valuesSqueare">
                          <div className="values">
                            <div className="price">
                              <div className="priceValue">
                                459 €
                              </div>
                              <div className="pricePerTime">
                                per month
                              </div>
                            </div>
                            <div className="apartmentValues">
                              <div className="apartmentType">
                                Double room                                
                              </div>
                              <div className="apartmentArea">
                                36m2
                              </div>
                            </div>
                            <div className="rentTerms">
                              <div className="rentStart">
                                <CalendarOutlined />
                                Starting: 1st November, 2023                              
                              </div>
                              <div className="rentEnd">
                                <CalendarOutlined />
                                Ending: 31st July, 2024
                              </div>
                            </div>
                            <div className="posted">
                              <ClockCircleOutlined />
                                Posted: 4 hours ago
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="apartmentSpec">
                    <div className="specTitle">
                      Apartment Spesifications and Accessories
                    </div>
                    <div className="specList">
                      <div className="specBox">
                        <div className="spec">
                        <CheckSquareOutlined /> Lift
                        </div>
                        <div className="spec">
                        <CheckSquareOutlined /> Balcony
                        </div>
                      </div>
                      <div className="specBox">
                        <div className="spec">
                          <CheckSquareOutlined /> Accesible
                        </div>
                        <div className="spec">
                          <CheckSquareOutlined /> Dish washer
                        </div>
                      </div>
                      <div className="specBox">
                        <div className="spec">
                          <CheckSquareOutlined /> Washing machine
                        </div>
                        <div className="spec">
                          <CheckSquareOutlined /> Laundry room
                        </div>
                      </div>
                      <div className="specBox">
                        <div className="spec">
                          <CheckSquareOutlined /> Furnished
                        </div>
                        <div className="spec">
                          <CheckSquareOutlined /> Sauna possibility
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        );
    }
}

export default Item;