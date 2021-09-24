import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { egmReducer } from './reducers/egmReducer';
import { dateFilterReducer } from './reducers/accountReducer';

const reducer = combineReducers({
  egm: egmReducer,
  account: dateFilterReducer,
});

const middleWare = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
