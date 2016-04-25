import React from 'react';
import { Route, IndexRoute } from 'react-router';

 
import App from './../components/App';
 
import ListContainerRow from './../components/listdemo/listContainerRow'; 
import ListContainerNoRow from './../components/listdemo/listContainerNoRow';
import HomePage from './../Homepage' 

export const createRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
 
    <Route path="listdemoRow" component={ListContainerRow} />
    <Route path="listdemoNoRow" component={ListContainerNoRow} />
    
  </Route>
);