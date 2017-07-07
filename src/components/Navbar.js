import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default class Navigation extends Component {

  render() {
    return (
        <Navbar light className="color-nav">
          <NavbarBrand href="/">Protean</NavbarBrand>
        </Navbar>
    );
  }
}
