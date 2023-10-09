import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

class Offers extends Component {
    render() {
      return (
        <>
        offers
        <div>
          <Link to='/item'>Item</Link>
          <Link to='/create'>add offer</Link>
          <Link to='/about'>about</Link>
          <Link to='/profile'>profile</Link>
          <Link to='/create'>add offer</Link>
          <Link to='/login'>login</Link>
        </div>
        </>
        );
    }
}

export default Offers;