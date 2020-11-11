import { storage, db } from '../firebase/config';
import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
} from '../constants/productConstants';

// List Products
export const listProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const snap = await db.collection('products').get();

    let products = [];
    snap.forEach((doc) => {
      products.push({
        ...doc.data(),
        _id: doc.id,
      });
    });

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await db.collection('products').doc(id).delete();

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.message });
  }
};

// Create Product
export const createProduct = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const {
      brand,
      category,
      countInStock,
      description,
      imageFile,
      name,
      price,
    } = data;

    const storageRef = storage.ref(imageFile.name);
    const collectionRef = db.collection('products');

    await storageRef.put(imageFile);

    const imageURL = await storage.ref(imageFile.name).getDownloadURL();

    await collectionRef.add({
      brand,
      category,
      countInStock,
      description,
      imageURL,
      name,
      price,
      numReviews: 0,
    });

    dispatch({ type: PRODUCT_CREATE_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.message });
  }
};

// List Product Details
export const listProductDetails = (id) => async (dispatch, getState) => {
  try {
    console.log(id);
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const productDetails = await (
      await db.collection('products').doc(id).get()
    ).data();

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: productDetails });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

// Create Product Review
export const createProductReview = (review) => async (dispatch, getState) => {};
