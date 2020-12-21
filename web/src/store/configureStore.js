import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from 'reducers';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const persistConfig = {
    key: 'root',
    storage
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  var store = createStore(persistedReducer, preloadedState, composedEnhancers);
  const persist = persistStore(store);
  return { store, persist };
}
