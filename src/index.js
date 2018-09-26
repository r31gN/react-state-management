import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, AppProvider } from './maze';

import './index.css';

const store = createStore({
  users: [
    {
      id: 1,
      name: 'Vlad'
    },
    {
      id: 2,
      name: 'Reign'
    }
  ]
});

ReactDOM.render(
  <AppProvider store={store}>
    <App />
  </AppProvider>,
  document.getElementById('root')
);
