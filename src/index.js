import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './maze';
import App from './App';
import AnotherComponent from './AnotherComponent';
import './index.css';

ReactDOM.render(
  <AppProvider>
    <App style={{ marginBottom: '2rem' }} />
    <AnotherComponent />
  </AppProvider>,
  document.getElementById('root')
);
