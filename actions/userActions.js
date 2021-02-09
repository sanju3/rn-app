import * as types from "../constants";
import { getSingleUser, signIn, signUp } from "../services";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });
    const data = await signIn(username, password);
    dispatch({ type: types.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.LOGIN_ERROR,
      payload: error.message,
    });
  }
};

export const register = (username, fullname, password) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST });
    const data = await signUp(username, fullname, password);
    dispatch({ type: types.REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.REGISTER_ERROR,
      payload: error.message,
    });
  }
};
