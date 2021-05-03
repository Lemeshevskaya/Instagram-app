import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import style from '../../css/main.css'

class Landing extends Component {
  render() {
    return (
      <div className="landing">
    <div className="dark-overlay text-light">
      <div className="container container_main container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="display-3 loading_maintext">Instagram
            </h1>
            <p className="lead"> Create a  profile, share posts</p>
            <hr />
            <Link to="/register" className="btn btn-lg btn-light mr-2 landing_button">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-light landing_button">Login</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

export default Landing;
