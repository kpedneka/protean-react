const initialState = {
	fetching: false,
	fetched: false,
	error: null,
	bills: []
}
export default (state = initialState, action) => {
	switch (action.type){
		case "CREATE_NEW_BILL":
			return state;
		case "GET_BILLS":
			console.log("from the reducer: ", action.payload);
			return {...state, bills: action.payload};
		case "WRITE_BILL_FAILED":
			return {...state, error: action.payload };
		default:
			return state;
	}
};