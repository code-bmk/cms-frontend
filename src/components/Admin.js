import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Admin extends React.Component {
  constructor(props){
    super(props)
    const token = localStorage.getItem("token");
    let loggedIn = true
    if(token === null){
      loggedIn = false
    }
    this.state = {
      loggedIn
    }
  }
  render() {

    if(this.state.loggedIn === false){
      return <Redirect to="/" />
    }

    return(
      <div className="admin">
       <h1>This is an admin page. only auth people can see this</h1>
       <Link to="/logout">Logout</Link>
      </div>
    )
  }
}

export default Admin;