import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Button } from 'react-bootstrap';

import { login } from '../actions/Auth';

class Intro extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);
	}

	login(e) {
		e.preventDefault();
		this.props.login();
	}

	render() {
		return (
			<div>
				<Jumbotron>
					<h1 className="display-10">Welcome to Protean</h1>
					<p className="lead">The simplest way to keep track of all your IOUs</p>
					<hr className="my-2" />
					<p className="lead">
						Get started today! Sign in with facebook
						<br />
					<Button bsStyle="primary" onClick={this.login}>Sign in</Button>
					</p>
				</Jumbotron>
		    </div>
		);
	}
}

// passing in the login action as a prop to Login component
function mapDispatchToProps (dispatch) {
  return {
    login: () => { dispatch(login()) }
  }
}

export default connect(null, mapDispatchToProps)(Intro);