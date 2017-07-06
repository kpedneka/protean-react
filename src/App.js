import React, { Component } from 'react';
import Navigation from './components/Navbar';
import { connect } from 'react-redux';

import Profile from './components/Profile';
import Intro from './components/Intro';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Navigation />
        {this.props.user ? <Profile /> : <Intro />}
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		bills: state.bills.bills,
		user: state.auth.name,
	}
}

export default connect(mapStateToProps)(App);
