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

const connect = mapStateToProps => Component => {
  const MemoComponent = React.memo(Component);
  let f = null;

  const EnhancedComponent = props => {
    const { state, setGlobalValue } = useContext(Ctx);
    f = f || setGlobalValue;
    return (
      <MemoComponent
        {...props}
        {...mapStateToProps(state)}
        setGlobalValue={f}
      />
    );
  };

  return React.memo(EnhancedComponent);
};

export { createProvider, connect };
