import React, { useState, useContext } from 'react';

const Ctx = React.createContext();

const createProvider = (initialState = {}) => ({ children }) => {
  const [appState, setAppState] = useState(initialState);

  const setGlobalValue = (key, value) =>
    setAppState({
      ...appState,
      [key]: value
    });

  return (
    <Ctx.Provider
      value={{
        state: appState,
        setGlobalValue
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

const connect = mapStateToProps => Component => () => {
  const { state, setGlobalValue } = useContext(Ctx);
  const values = mapStateToProps(state);
  return <Component {...values} setGlobalValue={setGlobalValue} />;
};

export { createProvider, connect };
