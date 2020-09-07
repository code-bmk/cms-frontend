import React, {Component} from 'react';
import { redirect, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true
    if(token === null){
      loggedIn = false
    }

    this.state = {
      username: '',
      password: '',
      loggedIn
    }

    this.onChange = this.onChange.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitForm(e){
    e.preventDefault()
    const {username, password} = this.state;
    // login magic
    if(username === "a" && password == "a"){
      localStorage.setItem("token","asadsdas");
      this.setState({
        loggedIn: true
      })

    }
  }
  render() {
    if(this.state.loggedIn){
      return <Redirect to="/admin"/>
    }
    return(
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={this.submitForm}>
          <input type="text" placeholder="username" name="username" value={this.state.username} onChange={this.onChange} />
          <br/>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.onChange} />
          <br/>
          <input type="submit"onSubmit={this.submitForm} ></input>
          <br/>
        </form>
      </div>
    )
  }
}

export default Login;