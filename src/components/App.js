import React from 'react';
import { auth } from '../firebase';

const App = () => (
  <div>
    <button type="button" onClick={() => auth.signOut()}>Sign Out</button>
  </div>
);

export default App;
