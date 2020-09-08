import React from 'react';
import {Link} from 'react-router-dom';

class Logout extends React.Component {
  constructor(props){
    super(props)
    localStorage.removeItem("token");
  }
  render() {
    return(
      <div className="logOut">
        <h1> You have been logged out</h1>
        <Link to="/Login">Login Again</Link>
      </div>
    )
  }
}

export default Logout;