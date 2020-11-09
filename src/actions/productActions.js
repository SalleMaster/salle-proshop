// List Products
export const listProducts = () => async (dispatch, getState) => {
  console.log('list produts');
};

// Delete Product
export const deleteProduct = () => async (dispatch, getState) => {
  console.log('delete product');
};

// Create Product
export const createProduct = (data) => async (dispatch, getState) => {
  console.log('create product action', data);
};
