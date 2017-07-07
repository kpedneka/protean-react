import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { logout } from '../actions/Auth';
import { addBill } from '../actions/Bills';

class Profile extends Component{
  constructor (props, context) {
    super(props, context);
    this.state = {
      name: '',
      photoURL: ''
    }

    this.logout = this.logout.bind(this);
    this.addBill = this.addBill.bind(this);
  }

  componentDidMount() {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/'+uid)
      .once('value')
      .then(snap => {
        var user = snap.val();
        console.log('the currentUser information\n', user);
        this.setState({ name: user.name, photoURL: user.photoURL });
      })
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  addBill(e) {
    e.preventDefault();
    this.props.addBill(this.state.name);
  }

  render () {
    return (
      <div className="user-dashboard">
        <div className="user-functions">
          <Button color="secondary" onClick={this.addBill}>+ bill</Button>
          <Button color="secondary">+ group</Button>
          <Button color="primary" onClick={this.logout}>Logout</Button>
        </div>
        <div className="user-profile">
          <p> Hi, {this.state.name}</p>
          <img src={this.state.photoURL} alt="profile" width="300" height="300"/>
        </div>

        <div className="user-bills">
          {this.state.bills ? <p>Have yet to implement the function to show bills</p> : <p>Looks like you do not have any bills yet</p>}
        </div>
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

function mapDispatchToProps (dispatch) {
  return {
    logout: () => { dispatch(logout()) },
    addBill: () => { dispatch(addBill()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
