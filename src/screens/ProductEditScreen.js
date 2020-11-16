import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { PRODUCT_EDIT_RESET } from '../constants/productConstants';

import { listProductDetails, editProduct } from '../actions/productActions';

const ProductEditScreen = ({ match }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState({});
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productEdit = useSelector((state) => state.productEdit);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = productEdit;

  useEffect(() => {
    dispatch({ type: PRODUCT_EDIT_RESET });
    if (!product || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
    }

    if (product) {
      setName(product.name);
      setPrice(product.price);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }

    if (successEdit) {
      setTimeout(() => {
        dispatch({ type: PRODUCT_EDIT_RESET });
      }, 5000);
    }
  }, [dispatch, match, product, successEdit]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
      brand,
      category,
      countInStock,
      description,
    };
    dispatch(editProduct(data, product._id, imageFile));
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading || loadingEdit ? (
          <Loader />
        ) : error || errorEdit ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {successEdit && (
              <Message variant='success'>Product Updated</Message>
            )}
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={(e) => setImageFile(e.target.files[0])}
              ></Form.File>
              {imageFile && imageFile.name}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
