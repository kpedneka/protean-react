import user from './User';
import bills from './Bills';
import auth from './Auth';
import { combineReducers } from 'redux';

// so now userReducer receives only the user part of the state
// similarly, billsReducer receives only the bills part of the sate
const combinedReducers = combineReducers({
	user,
	bills,
	auth
});

export default combinedReducers;