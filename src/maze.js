import React, { useState, useContext } from 'react';

const Ctx = React.createContext();
let dispatch = null;

const createProvider = (initialState = {}, effects = {}) => ({ children }) => {
  const [appState, setAppState] = useState(initialState);

  const _dispatch = (effectName, value) => {
    const effectCb = effects[effectName];

    if (effectCb) {
      setAppState(prevState => {
        const newState = effectCb(prevState, value);

        if (process.env.NODE_ENV === 'development') {
          console.group(`'${effectName}' update logs.`);
          console.log(`Before state update: `, prevState);
          console.log(`After state update: `, newState);
          console.groupEnd();
        }

        return newState;
      });
    } else {
      console.error(`There is no '${effectName}' effect defined.`);
    }
  };

  dispatch = dispatch || _dispatch;

  return (
    <Ctx.Provider
      value={{
        state: appState,
        dispatch
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

const connect = mapStateToProps => Component => {
  const MemoComponent = React.memo(Component);

  const EnhancedComponent = props => {
    const { state, dispatch } = useContext(Ctx);
    return (
      <MemoComponent
        {...props}
        {...mapStateToProps(state)}
        dispatch={dispatch}
      />
    );
  };

  return EnhancedComponent;
};

export { createProvider, connect };
