import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from 'redux-offline';
import defaultConfig from 'redux-offline/lib/defaults';

import reducers from './reducers/index';

export const persistOptions = {
  blacklist: ['registrationReducer'],
};

const offlineConfig = {
  ...defaultConfig,
  persistOptions,
};

const store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk, ReduxPromise),
    offline(offlineConfig),
  ),
);

export default store;
