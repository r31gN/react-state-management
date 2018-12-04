import React, { useState, useContext } from 'react';

const Ctx = React.createContext();

let f = null;
const createProvider = (initialState = {}) => ({ children }) => {
  const [appState, setAppState] = useState(initialState);

  const setGlobalValue = (key, value) =>
    setAppState(prevState => ({
      ...prevState,
      [key]: value
    }));

  f = f || setGlobalValue;

  return (
    <Ctx.Provider
      value={{
        state: appState,
        setGlobalValue: f
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

const connect = mapStateToProps => Component => {
  const MemoComponent = React.memo(Component);

  const EnhancedComponent = props => {
    const { state, setGlobalValue } = useContext(Ctx);
    return (
      <MemoComponent
        {...props}
        {...mapStateToProps(state)}
        setGlobalValue={setGlobalValue}
      />
    );
  };

  return EnhancedComponent;
};

export { createProvider, connect };
