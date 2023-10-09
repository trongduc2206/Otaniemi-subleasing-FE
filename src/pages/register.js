import React, { Component } from "react";
import { Link } from 'react-router-dom';
import '../styles/register.css';

class Register extends Component {
    render() {
      return (
        <>
        register
        <div>
          <Link to='/'>main</Link>
          <Link to='/login'>login</Link>
        </div>
        <h1>Register!</h1>
        <form method="POST">
            <input type="email" name="email" />
            <input type="password" name="password" />
            <input type="password" name="verification" />
            <input type="submit" value="Submit!" />
        </form>
        </>
        );
    }
}

export default Register;