import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { egmListReducers } from './reducers/egmReducers';
import { chatReducers } from './reducers/chatReducers';

const reducer = combineReducers({
  egm: egmListReducers,
  chat: chatReducers,
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
