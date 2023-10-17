import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/login.css';
import {notification} from 'antd'

const baseURL = "https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io";

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

  handleSubmit(event) {
    event.preventDefault() 
    const user = {};
      user.username = this.state.username; 
      user.password = this.state.password;
    
    axios.post(`${baseURL}/api/auth/login`, user).then((response) => {
      
      if(response.status == "200" && response.data.status.code == "success" ){
        this.setState({auth: "yes"});
        console.log("1", this.state.auth);
        localStorage.setItem("user", JSON.stringify(response.data.data))
        window.location.replace("/")
      } else { 
        this.setState({error: response.message})
        notification.error({
          message: 'Wrong username or password',
          description: response.data.status.message
        })
      }
    }).catch((error) => {
        this.setState({error: error.response})
      console.log(error)
        // console.log(this.state.error);
      notification.error({
        message: 'Login Failed',
        description: error.response.data.status.message
      })
      }
    );
  }

  render() {
    return (
      <>
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
              <Link className="link" to='/register'>Not registered yet.</Link>
            </div>
          </form>
        </div>
      </div> 
      </>
      );
  }
}

export default Login;