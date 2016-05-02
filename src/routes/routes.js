import React from 'react';
import { Route, IndexRoute } from 'react-router';

 
import App from './../components/App';
import CommDemo from './../components/pages/commDemo';
import ListCommDemo from './../components/pages/listCommDemo';
import ListContainerRow from './../components/listdemo/listContainerRow'; 
import ListContainerNoRow from './../components/listdemo/listContainerNoRow';
import ToDoRedux from './../components/redux/todo/todoRedux';
import ReduxList from './../components/redux/reduxList/reduxList';

export const createRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={CommDemo} />
    <Route path="listCommDemo"  >
      <IndexRoute component={ListCommDemo} />
    </Route>
   
    <Route path="listdemoRow" component={ListContainerRow} />
    <Route path="listdemoNoRow" component={ListContainerNoRow} />
    <Route path="redux/ToDo" component={ToDoRedux} />
    <Route path="redux/ReduxList" component={ReduxList} />
  </Route>
);



/*
 *  
    <Route path="page2/:id"  >
      <IndexRoute component={Page2} />
    </Route>
 * 
 */