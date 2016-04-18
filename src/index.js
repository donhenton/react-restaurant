import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createRoutes } from './routes/routes';


ReactDOM.render(
 
    <Router routes={createRoutes()} history={browserHistory} />
   
  , document.querySelector('.container'));
