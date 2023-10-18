import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import './Header.css';
import logo from './catLogo.png';
import plusIcon from './plusIcon.svg';


class Header extends Component {
    render() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
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
                            <Button className="primaryButton">Filter Results</Button>
                            <Button>Newest First</Button>
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
                            {
                                currentUser ?
                                    <div>
                                        <div className="profile">
                                            <div className="dropdown">
                                                <div className="profileIcon">
                                                    {currentUser.username.charAt(0)}
                                                </div>
                                                <div class="dropdown-content">
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
