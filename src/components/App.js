import React, { Component } from 'react';
import './App.css';

import {Router,Redirect, Route , Switch } from 'react-router-dom';
import Home from './home';
import Dashboard from './dashboard';
import AddExpense from './addExpense';
import createHistory from 'history/createBrowserHistory';
import * as actions from '../actions';
import {connect} from 'react-redux';


export const history = createHistory();
class App extends Component {
  componentWillMount() {
    this.props.dispatch(actions.getUser());
  }

  render() {

    return (
      <Router history={history}>
      <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/dashboard" component={() => <Dashboard user={this.props.user}/>} />
      <Route exact path="/" component={() => <Redirect to={{pathname: '/home'}}/> } />
      <Route exact path="/add/expense" component={() => <AddExpense  user={this.props.user}/>}/>
      </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps)(App);
