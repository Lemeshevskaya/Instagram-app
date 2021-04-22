import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import { logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { SET_CURRENT_USER } from './actions/types';

//check for token in local storage
if(localStorage.jwtToken){
  //if found
  //decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  //check for expired token
  const currentTime = Date.now()/1000;
  //if token is expired
  if(decoded.exp < currentTime){

    //then logout user automatically
    store.dispatch(logoutUser());
    //redirect user to login page
    window.location.href = "/login";
  }
  //else if not expired
    //set auth header
     setAuthToken(localStorage.jwtToken);
    //SET_CURRENT_USER
      store.dispatch({
       type: SET_CURRENT_USER,
        payload: decoded
      });
}

export default class App extends Component {
  render() {
    return (
      <Provider store= {store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path = "/" component={Landing} />
          <Route exact path= "/register" component ={Register}/>
          <Route exact path="/login" component={Login} />
          <Footer />
        </div>
      </Router>
      </Provider>
    )
  }
}

