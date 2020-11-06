import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
} from '../constants/userConstants';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const UserEditScreen = ({ match, history }) => {
  const uid = match.params.uid;

  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
      dispatch({
        type: USER_DETAILS_RESET,
      });
      history.push('/admin/userlist');
    } else {
      if (!user || user.uid !== uid) {
        dispatch(getUserDetails(uid));
      } else {
        setName(user.name);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, history, uid, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('update');
    dispatch(updateUserProfile({ uid, name, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
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

export default UserEditScreen;
