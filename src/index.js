import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import firebase from './services/firebase';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {history} from './components/App';

const store = require('./reducers').init();

ReactDOM.render( <Provider store={store}>
                 <App />
                 </Provider>, document.getElementById('root'));
registerServiceWorker();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    const {pathname} = history.location;
    if(pathname === '/home') {
      history.push('/dashboard');
    }

  } else {
    history.push('/home');
  }
});
