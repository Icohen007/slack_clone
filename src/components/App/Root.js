import React from 'react';
import {
  Route, Switch, useHistory,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import { lightTheme } from '../../theme';
import Register from '../Auth/Register';
import Login from '../Auth/Login';
import App from './App';
import Spinner from '../Shared/Spinner';

const Root = () => {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  if (loading) {
    return <Spinner secondaryColor={lightTheme.colors.white} fullWindow />;
  }

  if (user) {
    history.push('/');
  } else {
    history.push('/login');
  }

  return (
    <Switch>
      <Route exact path="/">
        <App user={user} />
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
