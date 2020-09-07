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
      errorMessage: '',
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
  
    const data = { username: username , password: password};

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };
  fetch('https://cryptic-escarpment-29124.herokuapp.com/authenticate', requestOptions)
      .then(async response => {
          const data = await response.json();

          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              this.setState({
                loggedIn: false
              })
              return Promise.reject(error);
          }

          localStorage.setItem("token",data.token);
          this.setState({
            loggedIn: true
          })
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          this.setState({
            loggedIn: false
          })
          console.error('There was an error!', error);
      });



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