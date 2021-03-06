
import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {loginUser} from '../../actions/authActions'; 
import classnames from 'classnames';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  onChange(e){
    //this.setState({name: e.target.value}); to pass value only name text field
    this.setState({[e.target.name]: e.target.value});
  }
 onSubmit(e){
  e.preventDefault()

  const user = {
    email: this.state.email,
    password: this.state.password,
  };
  
  this.props.loginUser(user);
 }
 //lifecycle
 componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/dashboard');
 }}
 componentWillReceiveProps(nextProps) {
  if(nextProps.auth.isAuthenticated){
    this.props.history.push('dashboard');
  }
  if (nextProps.errors){
    this.setState({errors:nextProps.errors});
  }
  }
  render() {
    //const errors = this.state.errors; 
    const {errors} = this.state;
    return (
      <div className="login">
    <div className="container container_main">
      <div className="row">
        <div className="col-md-8 text-center login_center">
          <h1 className="display-3 loading_maintext text-center">Instagram</h1>
          <form noValidate onSubmit = {this.onSubmit.bind(this)}>
            <div className="form-group form_input">
              <input type="email" className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}  placeholder="Email Address" name="email" value = {this.state.email} onChange = {this.onChange.bind(this)} />
              {errors.email && (
                <div className = "invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="form-group form_input">
              <input type="password" className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}  placeholder="Password" name="password" value = {this.state.password} onChange = {this.onChange.bind(this)} />
              {errors.password && (
                <div className = "invalid-feedback">
                  {errors.password}
                </div>
              )}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4 btn_submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, {loginUser})(Login);