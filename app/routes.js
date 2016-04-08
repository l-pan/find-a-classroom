import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './App';
import Home from './components/Home';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
  </Route>
);

export default routes;
