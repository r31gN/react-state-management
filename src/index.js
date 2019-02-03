import React from 'react';
import ReactDOM from 'react-dom';
import { createProvider } from 'simpply';
import systemStorage from './StorageEntities';
import App from './App';
import AnotherComponent from './AnotherComponent';
import './index.css';

const AppProvider = createProvider(systemStorage);

ReactDOM.render(
  <AppProvider>
    <App style={{ marginBottom: '2rem' }} />
    <AnotherComponent />
  </AppProvider>,
  document.getElementById('root')
);
