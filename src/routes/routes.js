import React from 'react';
import { Route, IndexRoute } from 'react-router';

 
import Home from './components/home';
import Page2 from './components/pages/page2';
import Page3 from './components/pages/page3'; 

export const createRoutes = store => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="posts/:postId">
      <IndexRoute component={Page2} />
    </Route>
    <Route path="new-post" component={Page3} />
  </Route>
);