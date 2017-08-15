import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Button, Image } from 'react-bootstrap';

import Bill from './Bill';
import Group from './Group';
import { logout } from '../actions/Auth';
import { getBills } from '../actions/Bills';


function ShowBills(props) {
  console.log('in ShowBills function');
  console.log(props.data.length);
  const options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
  };
  return (
    <div className="user-bills">
      {props.data.map(function (bill, index) {
        return(
          <div key={bill.dateCreated} className="bill-item" >
            <div>{bill.title} </div>
            <div>{bill.description}</div>
            <div>{bill.amount}</div>
            {bill.tags &&
              bill.tags.map(function (tag, index) {
                return (
                  <span key={tag.id}>{tag.text}</span>
                )
              })
            }
            <div>{bill.owner}</div>
            <div>{new Date(bill.dateCreated).toLocaleTimeString("en-us", options)}</div>
          </div>
          );
      })}
    </div>
  );
}

ShowBills.propTypes = {
  data: PropTypes.array.isRequired
}

class Profile extends Component{
  constructor (props, context) {
    super(props, context);
    this.state = {
      name: '',
      photoURL: '',
      bills: null
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    var uid = firebase.auth().currentUser.uid;
    console.log(uid)
    if (uid){
      firebase.database().ref('/users/'+uid)
      .once('value')
      .then(snap => {
        var user = snap.val();
        console.log('the currentUser information\n', user);
        this.setState({ name: user.name, photoURL: user.photoURL });
      });
    }
      // this function triggers whenever the page loads for the first time
      var ref = firebase.database().ref("bills");
      ref.orderByValue().once("value").then( snapshot => {
        snapshot.forEach(snapChild => {
          var newArray = this.state.bills ? this.state.bills.slice() : [];
          newArray.push(snapChild.val());
          this.setState({ bills: newArray });
          console.log(this.state);
        });
      });
      // this function triggers whenever a bill gets changed (added/deleted)
      ref.on("child_changed", function(snapshot) {
        var changedPost = snapshot.val();
        console.log("The updated post title is " + changedPost.title);
        var newArray = this.state.bills ? this.state.bills.slice() : [];
        newArray.push(changedPost);
        this.setState({ bills: newArray });
        console.log(this.state);
      }.bind(this));
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render () {
    return (
      <div className="user-dashboard">
        <div className="user-functions">
          <Bill />
          <Group />
          <Button bsStyle="default" onClick={this.logout}>Logout</Button>
        </div>
        <div className="user-profile">
          <h2> Hi, {this.state.name}</h2>
          <Image src={this.state.photoURL} alt="profile" width="200" height="200" rounded />
        </div>

        {this.state.bills ? <ShowBills data={this.state.bills} /> : <p>Looks like you do not have any bills yet</p>}
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
    getBills: () => { dispatch(getBills()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
