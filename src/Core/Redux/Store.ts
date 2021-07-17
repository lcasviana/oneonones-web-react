import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Reducer } from './Reducers';

const store = createStore(
  Reducer,
  applyMiddleware(thunkMiddleware),
);

export type AppState = ReturnType<typeof Reducer>;
export default store;