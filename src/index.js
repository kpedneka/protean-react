import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './Store';
import config from './config';

firebase.initializeApp(config);

ReactDOM.render(<Provider store={store}>
 <App /> 
 </Provider>, document.getElementById('root'));
registerServiceWorker();
