import * as firebase from 'firebase';

export function addBill(name) {
	console.log('inside the action for addBill ', name);
	var database = firebase.database();
	database.ref('/users')
	return dispatch => {
		type: 'NEW_BILL',
		name
	}
}

export function getBills(username) {
	console.log('woohoo inside the action for getBills');
	const token = localStorage.getItem('fbToken');
	return dispatch => {
		if (token){
			console.log('token is ', token);
		}
	}
}