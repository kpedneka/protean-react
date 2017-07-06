import * as firebase from 'firebase';

export function logout () {
	console.log('hello reached logout action');
	// dispatch some action that removes the stored token
	localStorage.removeItem('fbToken');
  return dispatch => {
    dispatch({
      type: 'LOGOUT_USER',
      payload: null
    })
  }
};

export function login () {
	console.log('hello, reached login action');
	// dispatch some action that does the login
  return dispatch => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
    	var token = result.credential.accessToken;
      var user = result.user;
      	
      localStorage.setItem('fbToken', token);
      console.log('result from login ', user.displayName);
        dispatch({
          type: 'LOGIN_USER',
          payload: user.displayName
        })
  	})
  }
  // .catch(function(error) {
  // 	// Handle Errors here.
  // 	var errorCode = error.code;
  // 	var errorMessage = error.message;
  // 	// ...
  // 	console.log('error code: ', errorCode);
  //   console.log('error message: ', errorMessage);
  // });
}

