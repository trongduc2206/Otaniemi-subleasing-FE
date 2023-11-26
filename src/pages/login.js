import React, { Component } from "react";
import Header from "../Header";
import { Link } from 'react-router-dom';
import {RequestGet, RequestPost} from './services/apiRequest.js';
import '../styles/login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      auth: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({[target.name]: target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user = {};
      user.username = this.state.username; 
      user.password = this.state.password;
      const response = await RequestPost("/api/auth/login", user, "user", "/") 
      this.setState({auth: response})
  }

  render() {
    return (
      <>
      <Header className="Header"/> 
      <div className="loginPageMainContainer">
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="formElement loginTitle">
              <span className="title">Login</span>
            </div>
            <div className="formElement">
                <input className="input" placeholder="Name" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div className="formElement">
                <input className="input" placeholder="Password" name="password" type="password"  value={this.state.password} onChange={this.handleChange} />
            </div>
            <div className="formElement loginButton">
              <button  className="button" type="submit">Log In</button>
            </div>
            <div className="formElement linkToRegistration">
              <Link className="link" to='/register'>Not registered yet?</Link>
            </div>
          </form>
        </div>
      </div> 
      </>
      );
  }
}

export default Login;