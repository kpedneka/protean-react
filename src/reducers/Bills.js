const initialState = {
	fetching: false,
	fetched: false,
	error: false,
	bills: []
}
export default (state = initialState, action) => {
	switch (action.type){
		case "CREATE_NEW_BILL":
			return state;
		default:
			return state;
	}
};