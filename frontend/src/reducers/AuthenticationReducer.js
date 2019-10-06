import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT,
} from '../constants/AuthActionsConstants';

const initialState = {
  login: false,
  user: null,
};

export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        login: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        login: false,
      };
    case LOGOUT: {
      return {
        ...state,
        user: null,
        login: false,
      };
    }
    default:
      return state;
  }
}
