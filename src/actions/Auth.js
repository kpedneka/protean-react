import * as firebase from 'firebase';

export function logout () {
	console.log('hello reached logout action');
	// dispatch some action that removes the stored token
	firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
  return dispatch => {
    dispatch({
      type: 'LOGOUT_USER',
      payload: null
    })
  }
};

export function login() {
  console.log('hello, reached login action');
  // dispatch some action that does the login
  return dispatch => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const user = result.user;
        firebase.database().ref('/users/'+user.uid)
          .once('value')
          .then(snap => {
            // if no value exists at this node, create a new one
            if (!snap.val()){
              console.log('CREATING NEW USER');
              const new_user = {
                name: user.displayName,
                email: user.email,
                photoURL: 'https://graph.facebook.com/'+user.providerData[0].uid+'/picture?width=9999',
                bills: null
              }
              var updates = {};
              updates['/users/' + user.uid ] = new_user;
              // add user information to database
              firebase.database().ref().update(updates);              
            } else {
              console.log('FOUND USER');
            }
          })
      }
      // The signed-in user info.
      console.log('result from login: ', result.user.displayName)
      dispatch({
        type: 'LOGIN_USER',
        payload: result.user.displayName
      })
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('error: '+errorCode+'\nmsg: '+errorMessage);
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
    });
  }
}