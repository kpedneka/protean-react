import React, { Component } from 'react';
import Navigation from './components/Navbar';
import Login from './components/Login'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Login />
      </div>
    );
  }
}

export default App;
