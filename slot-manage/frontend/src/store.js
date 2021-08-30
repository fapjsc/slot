import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { egmReducer } from './reducers/egmReducer';

const reducer = combineReducers({
  egm: egmReducer,
});

const middleWare = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
