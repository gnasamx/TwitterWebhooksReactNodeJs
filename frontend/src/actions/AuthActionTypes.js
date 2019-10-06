import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../constants/AuthActionsConstants';

import { history } from '../helpers/history';

import {
  initaiateTwitterLoginService,
  loginService,
  logoutService,
} from '../services/authService';

/** Login actions */
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFailure(errorMessage) {
  return {
    type: LOGIN_FAILURE,
    errorMessage,
  };
}

export function initiateTWLogin() {
  return dispatch => {
    dispatch(loginRequest());
    initaiateTwitterLoginService();
  };
}

/** Login user */
export function loginTWUser() {
  return dispatch => {
    loginService().then(
      user => {
        dispatch(loginSuccess(user));
        history.push('/');
      },
      errorMessage => {
        console.log('errorMessage: ', errorMessage);
        dispatch(loginFailure(errorMessage));
      },
    );
  };
}

/** Logout actoin */
export function logoutSuccess() {
  return {
    type: LOGOUT,
  };
}

/** Logout user */
export function logoutTWUser() {
  return dispatch => {
    logoutService().then(
      response => {
        console.log('response:', response);
      },
      errorMessage => {
        console.log('errorMessage: ', errorMessage);
        dispatch(loginFailure(errorMessage));
      },
    );
    dispatch(logoutSuccess());
    history.push('/login');
  };
}
