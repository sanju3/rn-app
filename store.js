import { createStore, combineReducers, applyMiddleware } from "redux";
import { loginReducer, registerReducer } from "./reducers/userReducer";
import thunk from "redux-thunk";
const initialState = {};

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

const configureStore = () =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));

export default configureStore;
