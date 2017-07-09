import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Button, Image } from 'react-bootstrap';

import NewBill from './NewBill';
import { logout } from '../actions/Auth';
import { addBill } from '../actions/Bills';

class Profile extends Component{
  constructor (props, context) {
    super(props, context);
    this.state = {
      name: '',
      photoURL: '',
      showNewBill: false
    }

    this.logout = this.logout.bind(this);
    this.setNewBillVisible = this.setNewBillVisible.bind(this);
  }

  componentDidMount() {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in.')
      } else {
        console.log('No user is signed in.')
      }
    });
    var uid = firebase.auth().currentUser.uid;
    // var uid = authUser.uid;
    console.log(firebase.auth().currentUser)
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

  setNewBillVisible(e) {
    e.preventDefault();
    this.setState({showNewBill: !this.state.showNewBill})
  }

  render () {
    return (
      <div className="user-dashboard">
        <div className="user-functions">
          <Button bsStyle="default" onClick={this.setNewBillVisible}>+ bill</Button>
          <Button bsStyle="default">+ group</Button>
          <Button bsStyle="default" onClick={this.logout}>Logout</Button>
        </div>
        <div className="user-profile">
          <p> Hi, {this.state.name}</p>
          <Image src={this.state.photoURL} alt="profile" width="200" height="200" rounded />
        </div>

        <div className="user-bills">
          {this.state.bills ? <p>Have yet to implement the function to show bills</p> : <p>Looks like you do not have any bills yet</p>}
        </div>
        {this.state.showNewBill ? <NewBill /> : null}
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