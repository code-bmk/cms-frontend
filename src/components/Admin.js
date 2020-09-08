import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import SampleEditor from './SampleEditor';
import '../css/Styles.css';

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
       <h1>DashBoard Panel</h1>
     
       <div className="side-padding-20">
          <SampleEditor />
        </div>
       <Link to="/logout">Logout</Link>
      </div>
    )
  }
}

export default Admin;