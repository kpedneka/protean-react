const initialState = {
	fetching: false,
	fetched: false,
	error: false,
	bills: []
}
export default (state = initialState, action) => {
	switch (action.type){
		default:
			return state;
	}
};