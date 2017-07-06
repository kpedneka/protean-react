import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

import { logout } from '../actions/Auth';

class Profile extends Component{
  constructor (props, context) {
    super(props, context);

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    return (
      <div>
        <p> Hi {this.props.user}</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    bills: state.bills.bills,
    user: state.auth.name
  }
}

// passing in the login action as a prop to Login component
function mapDispatchToProps (dispatch) {
  return {
    logout: () => { dispatch(logout()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
