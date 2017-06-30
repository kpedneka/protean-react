import React from 'react';
import AlertContainer from 'react-alert'
import { FacebookLogin } from 'react-facebook-login-component';

class Login extends React.Component{

  constructor (props, context) {
    super(props, context);
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }

  showAlert = () => {
    this.msg.show('Some text or component', {
      time: 2000,
      type: 'success',
    })
  }

  responseFacebook (response) {
    console.log(response);
    //anything else you want to do(save to localStorage)...
  }

  render () {
    return (
      <div>
        <FacebookLogin socialId="proteanID"
                       language="en_US"
                       scope="public_profile,email"
                       responseHandler={this.responseFacebook}
                       xfbml={true}
                       fields="id,email,name"
                       version="v2.5"
                       className="facebook-login"
                       buttonText="Login With Facebook"/>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <button onClick={this.showAlert}>Submit</button>
      </div>
    );
  }

}

export default Login;
