import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

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

class App extends Component {
  render() {
    return (
      <Provider store= {store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path = "/" component={Landing} />
          <Route exact path= "/register" component ={Register}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:username" component={Profile} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path="/edit-profile"
              component={EditProfile}
            />
          </Switch>
          <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>
          <Route exact path="/not-found" component={NotFound} />
          <Footer />
        </div>
      </Router>
      </Provider>
    );
  }
}
export default App;

