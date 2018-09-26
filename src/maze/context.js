import React from 'react';

const { Provider, Consumer } = React.createContext({
  store: {},
  set: () => {},
  get: () => {}
});

const AppProvider = ({ store, children }) => {
  return <Provider value={store}>{children}</Provider>;
};

export { AppProvider, Consumer };
