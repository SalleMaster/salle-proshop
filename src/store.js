import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { userRegisterReducer, userLoginReducer } from './reducers/userReducers';

// Combine Reducers
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;