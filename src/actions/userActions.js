import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SET_USER,
  LOGOUT_USER,
} from '../constants/userConstants';
import { auth, db } from '../firebase/config';

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    console.log(cred);

    await db.collection('users').doc(cred.user.uid).set({
      name,
      email,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: USER_LOGIN_SUCCESS,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message,
    });
  }
};

export const setUser = (cred) => async (dispatch) => {
  try {
    const userInfo = await (
      await db.collection('users').doc(cred.uid).get()
    ).data();

    const user = {
      cred,
      userInfo,
    };

    dispatch({
      type: SET_USER,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_USER,
    });
  }
};

export const logout = () => (dispatch) => {
  auth.signOut();
  dispatch({
    type: LOGOUT_USER,
  });
};
