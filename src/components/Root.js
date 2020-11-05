import React, { useEffect } from 'react';
import {
  Redirect,
  Route, Switch,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { auth, db } from '../firebase';
import App from './App';
import Spinner from './Shared/Spinner';

const Root = () => {
  const [user, loading] = useAuthState(auth);
  const usersRef = db.collection('users');
  const userConnected = user && user.displayName;

  useEffect(() => {
    if (userConnected) {
      usersRef.doc(user.uid)
        .set({
          displayName: user.displayName,
          photoURL: user.photoURL,
        }, { merge: true });
    }
  }, [user, userConnected]);

  if (loading) {
    return <Spinner secondaryColor="white" fullWindow />;
  }

  return (
    <Switch>
      <Route exact path="/register">
        {userConnected ? <Redirect to="/" /> : <Register />}
      </Route>
      <Route exact path="/login">
        {userConnected ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/">
        {userConnected ? <App /> : <Redirect to="/login" />}
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Root;
