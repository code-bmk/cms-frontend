import React, {Component} from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import Display from './components/Display';
import Edit from './components/Edit';
import Logout from './components/Logout';
import TestDisplay from './components/TestDisplay';

class App extends Component {
  render() {
    
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Display}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/admin" component={Admin}></Route>
        <Route path="/posts/:id" component={TestDisplay}></Route>
        <Route exact path="/edit" component={Edit}></Route>
        <Route exact path="/logout" component={Logout}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;