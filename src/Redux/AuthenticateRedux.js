import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

import { CommonUtils } from "../Utils";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authenticateRequest: ["authenticate"],
  authenticateSuccess: ["authenticate"],
  authenticateFailure: ["error"],
  authenticateErrorSet: ["error"],
  userRegisterInfo: ["userRegister"],
  logout: null,
  autoAuthenticate: null
});

export const AuthenticateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: {
    userName: null,
    passWord: null,
    email: null
  },
  userRegister: null,
  isLogin: false,
  isSignup: false,
  isSendOTP: false,
  isReSendOTP: false,
  error: null,
  fetching: false,
});

/* ------------- Reducers ------------- */

// we're attempting to autoAuthenticate
export const request = state => state.merge({ fetching: true });

// we've successfully autoAuthenticate
export const success = (state, action) => {
  // CommonUtils.log('====================================');
  // CommonUtils.log("AuthenticateRedux success action: ", action);
  // CommonUtils.log('====================================');
  const { authenticate } = action;
  return state.merge({
    fetching: false,
    error: null,
    ...authenticate,
  });
};

// we've had a problem autoAuthenticate
export const failure = (state, { error }) =>
  state.merge({ fetching: false, ...error });

// we've logged out
export const logout = state => state.merge(INITIAL_STATE);

// save user register information  
export const registerInfo = (state, action) => {

  const { userRegister, status } = action.userRegister;
  CommonUtils.log("AuthenticateRedux user register info action: ", action);
  return state.merge({ userRegister: { ...userRegister }, ...status, fetching: false, error: null, });
};
// Set error to null
export const setError = state => state.merge({ error: null });
// startup saga invoked autoAuthenticate
export const autoAuthenticate = state => state;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTHENTICATE_REQUEST]: request,
  [Types.AUTHENTICATE_SUCCESS]: success,
  [Types.AUTHENTICATE_FAILURE]: failure,
  [Types.USER_REGISTER_INFO]: registerInfo,
  [Types.AUTHENTICATE_ERROR_SET]: setError,
  [Types.LOGOUT]: logout,
  [Types.AUTO_AUTHENTICATE]: autoAuthenticate
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
// export const isAuthenticate = (state) => state.user.userName !== null;
export const getUserRegisterInfo = state => state.userRegister
export const isAuthenticate = state => state.isLogin || state.isSignup;
