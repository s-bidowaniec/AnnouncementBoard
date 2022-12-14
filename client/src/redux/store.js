import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import usersReducer from './usersRedux';
import adsReducer from './adsRedux';
import searchResReducer from './searchResRedux';
// reducers

const subreducers = {
  ads: adsReducer,
  user: usersReducer,
  searchRes: searchResReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);

export default store;
