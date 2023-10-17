import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button } from "antd";
import logo from './catLogo.png';
import plusIcon from './plusIcon.svg';
import './Header.css';

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
                                    <Link>{currentUser.username}</Link>
                                    <Link onClick={() => {
                                        console.log("logout");
                                        localStorage.removeItem("user");
                                        window.location.replace("/");

                                    } }> Logout </Link>
                                    </div>
                                    :<Link to='/login'>Login</Link>
                            }

                        </div>
                    </nav>        
                </div>
            </>
        );
    }
  }

export default Header;
