import React from 'react';
import { Route, IndexRoute } from 'react-router';

 
import App from './../components/App';
import Page1 from './../components/pages/page1';
import Page2 from './../components/pages/page2';
import Page3 from './../components/pages/page3'; 

export const createRoutes = () => (
  <Route path="/" component={App} >
    <IndexRoute component={Page1} />
    <Route path="page2"  >
      <IndexRoute component={Page2} />
    </Route>
    
    <Route path="page2/:id"  >
      <IndexRoute component={Page2} />
    </Route>
    <Route path="page3" component={Page3} />
  </Route>
);