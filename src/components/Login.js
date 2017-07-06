import React from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { login, logout } from '../actions/Auth';

class Login extends React.Component{
  constructor (props, context) {
    super(props, context);

    this.state = {
      name: '',
      loggedIn: false,
      isLoading: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(e) {
    e.preventDefault();
    this.props.login();
    this.setState({ loggedIn: true });
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    this.setState({ loggedIn: false });
  }

  render () {
    return (
      <div>
        <button onClick={this.login}>Login with Facebook</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }

}

// passing in the login action as a prop to Login component
function mapDispatchToProps (dispatch) {
  return {
    login: () => { dispatch(login()) },
    logout: () => { dispatch(logout()) }
  }
}

export default connect(null, mapDispatchToProps)(Login);
