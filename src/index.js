import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { Router, browserHistory } from 'react-router';

import reducers from './reducers';


ReactDOM.render(
 
    <App />
   
  , document.querySelector('.container'));
