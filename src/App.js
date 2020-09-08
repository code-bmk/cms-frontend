import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Logout from './components/Logout';
import HomePage from './components/HomePage';

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/Login" component={Login}></Route>
        <Route exact path="/Admin" component={Admin}></Route>
        <Route exact path="/Logout" component={Logout}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;