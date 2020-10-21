import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './components/Root';
import GlobalStyle from './components/Global.style';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <Root />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
