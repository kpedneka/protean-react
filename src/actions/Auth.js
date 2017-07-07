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
      console.log(user);
      // connect to database to check for exisitng user in database
      var database = firebase.database();
      database.ref('/users/'+user.uid)
        .once('value')
        .then(snap => {
          if(!snap.val()) {
            console.log('CREATING NEW USER')
            var new_user = {
              name: user.displayName,
              email: user.email,
              photoURL: 'https://graph.facebook.com/'+user.providerData[0].uid+'/picture?width=9999',
              bills: null
            }
            var updates = {};
            updates['/users/' + user.uid ] = new_user;
            // add user information to database
            database.ref().update(updates);
          } else {
            // do nothing
            console.log('FOUND USER');
          }
      })
      // add fbToken to localStorage and then call reducer
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

