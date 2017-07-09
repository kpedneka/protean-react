import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'; 
import reducer from './reducers/Index';

export default createStore(reducer, applyMiddleware(ReduxThunk, logger));
