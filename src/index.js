import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Root from './components/App/Root';
import GlobalStyle from './components/App/Global.style';
import rootReducer from './reducers/rootReducer';
import ThemeProvider from './components/App/ThemeProvider';
import 'react-tippy/dist/tippy.css';
import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <Router>
        <ThemeProvider>
          <Root />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
