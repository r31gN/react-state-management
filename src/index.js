import React from 'react';
import ReactDOM from 'react-dom';
import { createProvider } from './maze';
import appReducer from './Reducers';
import App from './App';
import AnotherComponent from './AnotherComponent';
import './index.css';

const AppProvider = createProvider(appReducer);

ReactDOM.render(
  <AppProvider>
    <App style={{ marginBottom: '2rem' }} />
    <AnotherComponent />
  </AppProvider>,
  document.getElementById('root')
);
