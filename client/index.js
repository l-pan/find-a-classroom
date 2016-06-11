import React from 'react';
import routes from '../app/routes';
import DevTools from '../app/redux/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { configureStore } from '../app/redux/configureStore';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = configureStore(window.__INITIAL_STATE__);
const history = browserHistory;
const dest = document.getElementById('root');

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), dest);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}

if (process.env.CLIENT) {
  render(
    <Provider store={store} key="provider">
      <div>
        <Router history={history} routes={routes} />
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
