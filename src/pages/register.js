import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
      return (
        <>
        register
        <div>
          <Link to='/'>main</Link>
          <Link to='/login'>login</Link>
        </div>
        </>
        );
    }
}

export default Register;