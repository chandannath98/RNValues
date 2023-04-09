/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
const INITIAL_STATE = {
  isLoggedIn: false,
  isLoading: false,
  loginData: {},
  error: undefined,
};

export default function auth(state = INITIAL_STATE, action) {
 // console.log('LOGIN_SUCCESS', action);
  switch (action.type) {
    case 'LOGIN_ATTEMPT':
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
      };
      break;
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        loginData: action.loginData,
        error: undefined,
      };
      break;
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.error,
      };
      break;
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
      };
      break;
    
    default:
      return state;
  }
}
