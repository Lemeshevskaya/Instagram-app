import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

class Register extends Component {
  constructor(){
    super();
    this.state= {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }
  }
  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    
    this.props.registerUser(newUser, this.props.history);
    
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.errors){
        this.setState({errors:nextProps.errors});
      }
  }

  render() {

    const {errors} = this.state;
    //const {errors} = this.props;
    //const errors = this.state.errors;
   
    return (
      <div className="register">
    <div className="container .container_main ">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Instagram Account</p>
          <form noValidate onSubmit 
          = {this.onSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" className={classnames('form-control form-control-lg', {'is-invalid': errors.name})} placeholder="Name" 
              name="name" 
              value = {this.state.name} 
              onChange={this.onChange.bind(this)} required />
              {errors.name && (
                <div className = "invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>
            <div className="form-group">
              <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} placeholder="Email Address" 
              value = {this.state.email} 
              onChange={this.onChange.bind(this)} name="email" />
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
              {errors.email && (
                <div className = "invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})} placeholder="Password" 
              value = {this.state.password} 
              onChange={this.onChange.bind(this)} name="password" />
               {errors.password && (
                <div className = "invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password2})} placeholder="Confirm Password" 
              value = {this.state.password2} 
              onChange={this.onChange.bind(this)} name="password2" />
              {errors.password2 && (
                <div className = "invalid-feedback">
                  {errors.password2}
                </div>
              )}
              </div>
            <input type="submit" className="btn btn-info btn-block mt-4 btn_submit"  />
          </form>
        </div>
        </div>
    </div>
  </div>
)
}
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(Register);