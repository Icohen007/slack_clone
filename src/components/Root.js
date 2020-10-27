import React from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { auth } from '../firebase';
import App from './App';

const Root = () => {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  if (user && user.displayName) {
    history.push('/');
  } else {
    history.push('/login');
  }

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  );
};

export default Root;
