const initialState = {
	isLoggedIn: false,
	name: ''
}
export default (state = initialState, action) => {
	switch (action.type){
		case 'LOGIN_USER':
			console.log('in LOGIN_USER reducer');
			return { ...state, isLoggedIn: true, name: action.payload };
		case 'LOGOUT_USER':
			console.log('in LOGOUT_USER reducer');
			return { ...state, isLoggedIn: false, name: action.payload };
		default:
			console.log('in auth reducer ', action.type);
			return state;
	}
};