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
		case 'CHECK_CREDS':
			console.log('in CHECK_CREDS reducer ', action.payload);
			if (action.payload === null) {
				return state;
			}
			return {...state, isLoggedIn: action.payload.isLoggedIn, name: action.payload.name}
		default:
			console.log('in auth reducer ', action.type);
			return state;
	}
};