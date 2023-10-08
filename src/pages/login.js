import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
      return (
        <>
        login
        <div>
          <Link to='/'>main</Link>
          <Link to='/register'>register</Link>
        </div>
        </>
        );
    }
}

export default Login;