import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Root from './components/Root';
import GlobalStyle from './components/Global.style';
import theme from './theme';
import 'react-tippy/dist/tippy.css';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router>
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
