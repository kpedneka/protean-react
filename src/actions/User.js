export const addUser = (user) => {
	console.log('inside the action for addUser',user);
	return {
		type: 'register',
		user
	}
}