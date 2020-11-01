import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { auth } from './firebase/config';
import { useDispatch } from 'react-redux';
import { setUser } from './actions/userActions';

// Components
import MainNavbar from './components/MainNavbar';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  }, [dispatch]);
  return (
    <Router>
      <MainNavbar />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/admin/userList' component={UserListScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
