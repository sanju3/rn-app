import * as types from "../constants";

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { loading: true };
    case types.LOGIN_SUCCESS:
      return { loading: false, data: action.payload };
    case types.LOGIN_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return { loading: true };
    case types.REGISTER_SUCCESS:
      return { loading: false, data: action.payload };
    case types.REGISTER_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
