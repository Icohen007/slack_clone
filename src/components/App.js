import React from 'react';
import { auth } from '../firebase';
import NavigationBar from './NavigationBar';

const App = () => (
  <div>
    <NavigationBar />
    <button type="button" onClick={() => auth.signOut()}>Sign Out</button>
  </div>
);

export default App;
