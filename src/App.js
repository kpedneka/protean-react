import React, { Component } from 'react';
import Navigation from './components/Navbar';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { storeData } from './actions/Auth';
import Profile from './components/Profile';
import Intro from './components/Intro';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in.\n', user);
        storeData();
        this.setState({ isLoggedIn: true });
      } else {
        console.log('No user is signed in.')
        this.setState({ isLoggedIn: false });
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        {this.state.isLoggedIn ? <Profile /> : <Intro />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    storeData : () => { dispatch(storeData()) }
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default connect(mapStateToProps , mapDispatchToProps) (App);
