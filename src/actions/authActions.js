import Api from '../services/Api/index';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode';

export const registerUser = (userData, history) => async dispatch => {
  try {
    const response = await Api.Users.register(userData);
    if (response.status === 200) history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = userData => async dispatch => {
  try {
    const response = await Api.Users.login(userData);
    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginWithFacebook = userData => async dispatch => {
  try {
    await Api.Users.loginWithFacebook(userData);
    // if (response.status === 200) {
    //   const { token } = response.data;
    //   localStorage.setItem('jwtToken', token);
    //   setAuthToken(token);
    //   const decoded = jwtDecode(token);
    //   dispatch(setCurrentUser(decoded));
    // }
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
// Set Logged in User

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
