import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import {
  userRegisterReducer,
  userLoginReducer,
  userReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
} from './reducers/userReducers';

import { productListReducer } from './reducers/productReducers';

// Combine Reducers
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  user: userReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateProfileReducer,
  userDelete: userDeleteReducer,
  productList: productListReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
