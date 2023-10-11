import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <>
                <div className="header">
                    <nav className="menu">
                        <div className="logo">
                            logo!
                        </div>
                        <Link to='/item'>Item</Link>
                        <Link to='/create'>add offer</Link>
                        <Link to='/about'>about</Link>
                        <Link to='/profile'>profile</Link>
                        <Link to='/create'>add offer</Link>
                        <Link to='/login'>login</Link>
                    </nav>        
                </div>
            </>
        );
    }
  }

export default Header;
