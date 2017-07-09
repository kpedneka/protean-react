import React, { Component } from 'react';
import Navigation from './components/Navbar';
import * as firebase from 'firebase';
import Profile from './components/Profile';
import Intro from './components/Intro';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in.');
        this.setState({user: user.displayName});
      } else {
        console.log('No user is signed in.')
        this.setState({user: null});
      }
    }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        {this.state.user ? <Profile /> : <Intro />}
      </div>
    );
  }
}


export default App;
