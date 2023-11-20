import React, { Component, useState, useEffect } from "react";
import Header from "../Header";
import { useParams } from "react-router";
import {RequestGet, RequestPost} from './services/apiRequest.js';
import '../styles/itemPage.css';
import mainImage from './image 4.png';
import geo from "../styles/img/geo.svg";
import avatar from "../styles/img/avatar.svg";
import { Button } from "antd";
import { Link } from 'react-router-dom';
import {
  ShareAltOutlined,
  HeartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  CheckOutlined,
  CheckSquareOutlined
} from "@ant-design/icons";

function formatRelativeTime(timestamp) {
  const currentTime = new Date();
  const timeDifference = (currentTime - new Date(timestamp));
  let timePos;
  if (timeDifference <= 0) {
      timePos = -timeDifference;
  } else { timePos = timeDifference}
  // console.log(timePos);
  if (!isFinite(timeDifference)) {
      return timestamp;
  }
  // Convert the time difference to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

if (secondsDifference < 60) {
  return rtf.format(-secondsDifference, 'second');
} else if (secondsDifference < 3600) {
  const minutesDifference = Math.floor(secondsDifference / 60);
  return rtf.format(-minutesDifference, 'minute');
} else if (secondsDifference < 86400) {
  const hoursDifference = Math.floor(secondsDifference / 3600);
  return rtf.format(-hoursDifference, 'hour');
} else {
  const daysDifference = Math.floor(secondsDifference / 86400);
  return rtf.format(-daysDifference, 'day');
}
}

function formatDate(dateToFormat) {
  // Split the input date into parts (month and day)
      const date = new Date(dateToFormat);
      const options = { day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('en-US', options); 
      const parts = formattedDate.split(' ');

      if (parts.length !== 2) {
      // Invalid input format
      }

      const month = parts[0];
      const day = parts[1];

      // Remove any commas or punctuation from the day part
      const cleanedDay = day.replace(/\D/g, '');

      // Convert the cleaned day to a number and check its value
      const dayNumber = parseInt(cleanedDay, 10);

      if (isNaN(dayNumber)) {
      // Invalid day part
      }

      // Determine the appropriate ordinal suffix (st, nd, rd, or th) for the day
      let ordinalSuffix;
      if (dayNumber >= 11 && dayNumber <= 13) {
      ordinalSuffix = 'th';
      } else {
      switch (dayNumber % 10) {
      case 1:
          ordinalSuffix = 'st';
          break;
      case 2:
          ordinalSuffix = 'nd';
          break;
      case 3:
          ordinalSuffix = 'rd';
          break;
      default:
          ordinalSuffix = 'th';
      }
      }

      // Combine the day with the ordinal suffix and the month
      return `${dayNumber}${ordinalSuffix} ${month}`;
}

const Item = (props) => {
      const [content, setContent] = useState([]);
      // Access the route parameter ":id"
      let params = useParams();
      // Your component logic here
      useEffect(() => {
        const fetchData = async () => {
          const data = await RequestGet("/api/offer/" + params.id)
          console.log("Item: ",data, params.id)
          setContent(data);
        }
        fetchData();
      }, []); 
    
      return (
        <>
          <Header className="Header"/> 
          <div className="itemPageMainContainer">
            <div className="itemPageCard">
              <div className="itemPageContent">
                <div className="itemPageHeaderSection">
                  <div className="itemNameBox">
                      <div className="itemName">
                        {content.area} {content.address}
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
                            {content.user ?
                                content.user.username
                                : <></>
                            }
                          </div>
                          <div className="landlordCheck">
                            <CheckCircleOutlined />
                            Verified
                          </div>
                        </div>
                      </div>
                      <Link to='/chat'>
                        <Button className="contactAction">Contact</Button>
                      </Link>
                    </div>
                    <div className="information">
                      <div className="description">
                        <h3>Description</h3>
                        <p>{content.description}</p>
                      </div>
                      <div className="valuesBox">
                        <div className="valuesSqueare">
                          <div className="values">
                            <div className="price">
                              <div className="priceValue">
                              {content.monthlyPrice}€
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
                                  {content.apartmentFloorArea ?
                                    <>
                                      Area: {content.apartmentFloorArea} 
                                      m2
                                    </>
                                    : <>Area: Not set</>
                                }
                              </div>
                            </div>
                            <div className="rentTerms">
                              <div className="rentStart">
                                <CalendarOutlined />
                                 {"Starting: "+formatDate(content.startDate)}                              
                              </div>
                              <div className="rentEnd">
                                <CalendarOutlined />
                                 {" Ending:"+content.endDate?
                                        formatDate(content.endDate)
                                        : <>Not set</>
                                }
                              </div>
                            </div>
                            <div className="posted">
                              <ClockCircleOutlined />
                              {" "+formatRelativeTime(content.createdTime)}
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
                        {content.furnished ?
                                <>
                                  <CheckSquareOutlined />
                                  Furnished
                                </>
                                : <></>
                            }
                        </div>
                        <div className="spec">
                        {content.furnished ?
                                <>
                                  <CheckSquareOutlined />
                                  Laundry room
                                </>
                                : <></>
                            }
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

export default Item;