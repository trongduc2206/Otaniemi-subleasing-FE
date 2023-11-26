import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import './Header.css';
import logo from './styles/img/catLogo.png';
import plusIcon from './styles/img/plusIcon.svg';

class Header extends Component {
    render() {
        let currentUser = ""
        // console.log(localStorage.getItem('user'))
            if(localStorage.getItem('user') !== undefined) {
                console.log(JSON.parse(localStorage.getItem('user')))
                currentUser = JSON.parse(localStorage.getItem('user'));
            }
        return (
            <>
                <div className="header">
                    <nav className="menu">
                        <Link to='/'>
                            <div className="logo">
                                <img src={logo} />
                                <div className="logoTextWrapper">
                                    <div className="upperLogoText">Otaniemi</div>
                                    <div className="lowerLogoText">Subleasing</div>
                                </div>
                            </div>
                        </Link>
                        <div className="mainButtonContainer">
                            {this.props.main ?
                                <>
                                    <Button className="primaryButton" onClick={this.props.showModal}>Filter Results</Button>
                                    {this.props.isSet ?
                                        <Button onClick={this.props.onFilterClear}>Clear Filters</Button>
                                        : <></>
                                    }
                                    
                                </>
                                : <></>
                            }
                        </div>
                        <div className="rightSideNav">
                            <Link to='/create'>
                                <div className="sublease">
                                    <div className="plusIcon">
                                        <img src={plusIcon} />
                                    </div>
                                    <div>Sublease</div>
                                </div>
                            </Link>
                            <Link to='/about'>About</Link>
                            {currentUser ?
                                    <div>
                                        <div className="profile">
                                            <div className="dropdown">
                                                <div className="profileIcon">
                                                    {currentUser.username.charAt(0)}
                                                </div>
                                                <div className="dropdown-content">
                                                    <Link className="profileLinks" onClick={() => {
                                                        console.log("logout");
                                                        localStorage.removeItem("user");
                                                        window.location.replace("/");
                                                    } }> Profile </Link>
                                                    <Link className="profileLinks" onClick={() => {
                                                        console.log("logout");
                                                        localStorage.removeItem("user");
                                                        window.location.replace("/");
                                                    } }> Logout </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : <div className="logInButton">
                                        <Link to='/login'>Log in</Link>
                                    </div>
                            }

                        </div>
                    </nav>        
                </div>
            </>
        );
    }
  }

export default Header;
