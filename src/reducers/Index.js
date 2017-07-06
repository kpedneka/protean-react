import User from './User';
import Bills from './Bills';
import Auth from './Auth';
import { combineReducers } from 'redux';

// so now userReducer receives only the user part of the state
// similarly, billsReducer receives only the bills part of the sate
const combinedReducers = combineReducers({
	User,
	Bills,
	Auth
});

export default combinedReducers;