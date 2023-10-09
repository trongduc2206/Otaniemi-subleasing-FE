import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/login.css';

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
      if(response.status === "200") //error is the error object you can get from the axios call
        this.setState({auth: "yes"});
      else { 
        this.setState({error: response.message})
      }
    }).catch((error) => {
        this.setState({error: error.response})
        console.log(this.state.error);
      }
    );
  }

  render() {
    return (
      <>
      <div>
        <Link to='/'>main</Link>
        <Link to='/register'>register</Link>
      </div>
      <h1>Login!</h1>
      <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input className="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
      </label>
      <label>
        Password:
        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
      </label>
      <button type="submit">Log In</button>
    </form>
      </>
      );
  }
}

export default Login;