
export function addBill(user) {
	console.log('inside the action for addBill',user);
	return {
		type: 'new',
		user
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