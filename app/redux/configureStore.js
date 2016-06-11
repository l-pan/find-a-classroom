import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from './reducers/index';
import DevTools from './DevTools';

export function configureStore(initialState = {}) {
  let finalCreateStore;

  if (process.env.CLIENT) {
    finalCreateStore = compose(
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = createStore;
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
