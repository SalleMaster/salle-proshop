import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SET_USER,
  LOGOUT_USER,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';
import { auth, db } from '../firebase/config';

// Register
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const cred = await auth.createUserWithEmailAndPassword(email, password);

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

// Login
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

// Set User
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

// Logout
export const logout = () => (dispatch) => {
  auth.signOut();
  dispatch({
    type: LOGOUT_USER,
  });
};

// List Users
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const snap = await db.collection('users').get();

    const data = snap.docs.map((doc) => {
      return { ...doc.data(), _id: doc.id };
    });

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.message,
    });
  }
};

// Get User Details
export const getUserDetails = (uid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    console.log(uid);

    let userDetails = await (
      await db.collection('users').doc(uid).get()
    ).data();

    userDetails.uid = uid;

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: userDetails,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// User Update Profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const { name, isAdmin, uid } = user;

    const userRef = db.collection('users').doc(uid);

    await userRef.update({
      name,
      isAdmin,
    });

    const updatedUser = await (
      await db.collection('users').doc(uid).get()
    ).data();

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: updatedUser,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.message,
    });
  }
};
