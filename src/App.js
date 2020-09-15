import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Test from './components/Test';
import Display from './components/Display';
import DetailDisplay from './components/DetailDisplay';
import Edit from './components/Edit';
import Logout from './components/Logout';
import HomePage from './components/HomePage';
import TestDisplay from './components/TestDisplay';

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route exact path="/test" component={Test}></Route>
        <Route exact path="/display" component={Display}></Route>
        <Route path="/detaildisplay/:id" component={DetailDisplay}></Route>
        <Route path="/testdisplay/:id" component={TestDisplay}></Route>
        <Route exact path="/edit" component={Edit}></Route>
        <Route exact path="/logout" component={Logout}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;