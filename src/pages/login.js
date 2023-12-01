import React, { Component } from "react";
import Header from "../Header";
import { Link } from 'react-router-dom';
import {RequestGet, RequestPost} from './services/apiRequest.js';
import {
  notification,
} from 'antd';
import '../styles/login.css';
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      auth: "",
      loading: false,
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
      // try {
      //   const response = await RequestPost("/api/auth/login", user, "user", "/")
      //   this.setState({auth: response})
      // } catch (error) {
      //   console.log(error)
      //   console.log(error.response.data.status.message)
      //   notification.error({
      //     message: 'Login Failed',
      //     description: error.response.data.status.message
      //   })
      // }
    if(!user.username || !user.password) {
      notification.error({
        message: 'Login Failed',
        description: 'Username and password are required for login'
      })
    } else {
      try {
        this.setState((prevState) => ({
          ...prevState,
          loading: true,
        }))
        const response = await axios.post("https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io/api/auth/login", user)
        this.setState((prevState) => ({
          ...prevState,
          loading: false,
        }))
        console.log("response:",response);
        if(response.status == "200" && response.data.status.code == "success" ){
          localStorage.setItem(`auth`, true)
          localStorage.setItem(`user`, JSON.stringify(response.data.data))
          window.location.replace("/")
          this.setState({auth: response.data.data})
          // return response.data.data;
        } else {
          notification.error({
            message: 'Login Failed',
            description: response.data.status.message
          })
        }
      } catch (error) {
        this.setState((prevState) => ({
          ...prevState,
          loading: false,
        }))
        console.log(error)
        console.log(error.response.data.status.message)
        notification.error({
          message: 'Login Failed',
          description: error.response.data.status.message
        })
      }
    }


  }

  render() {
    return (
      <>
      <Header className="Header" /> 
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
              <button  className="button" type="submit" disabled={this.state.loading}>
                {this.state.loading ? 'Logging in...' : 'Login'}
              </button>
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