import * as firebase from 'firebase';

export function getUsers() {
	var currentUser = firebase.auth().currentUser;
	if (!currentUser){
		// dispatch appropriate action type
	}
	
	firebase.database().ref('/users/')
	.once('value')
    .then(snap => {
    	var arr = [];
    	if(snap.val()) {
          	snap.forEach(function(childSnap) {
          		// console.log(childSnap.val());
          		arr.push(childSnap.val());
          	});
          	console.log(arr);
          	return dispatch => {
          		dispatch({
          			type: 'GET_USERS',
          			payload: arr
          		})
          	};
        } else {
			console.log('did not find any users');
        }
     })
    .catch(err => {
    	console.log(err);
    });
}