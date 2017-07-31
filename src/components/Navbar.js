import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Navigation extends Component {
	render() {
	    return (
	        <Navbar className="color-nav">
	          <Navbar.Brand><a href="/">Protean</a></Navbar.Brand>
	        </Navbar>
	    );
	}
}
