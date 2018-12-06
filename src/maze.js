import React, { useReducer, useContext } from 'react';

const effectsToNameMap = new Map();

const combineReducers = reducersObj => {
  let globalEffects = {};
  let globalInitialState = {};

  Object.keys(reducersObj).forEach(key => {
    globalEffects = {
      ...globalEffects,
      ...reducersObj[key].effects
    };
    globalInitialState[key] = reducersObj[key].initialState;

    Object.keys(reducersObj[key].effects).forEach(effectKey =>
      effectsToNameMap.set(effectKey, key)
    );
  });

  return {
    globalEffects,
    globalInitialState
  };
};

const Ctx = React.createContext();
let dispatch = null;
let reducerFn = null;

const createStore = appReducer => {
  if (!reducerFn) {
    reducerFn = (state, action) => {
      const { type, payload } = action;
      const fn = appReducer.globalEffects[type];
      const key = effectsToNameMap.get(type);

      return fn && typeof fn === 'function'
        ? {
            ...state,
            [key]: fn(state[key], payload)
          }
        : state;
    };
  }

  const [state, _dispatch] = useReducer(
    reducerFn,
    appReducer.globalInitialState
  );

  if (process.env.NODE_ENV === 'development') {
    console.log(`State: `, state);

    dispatch = action => {
      console.log(`Triggered '${action.type}'.`);
      _dispatch(action);
    };
  } else {
    dispatch = _dispatch;
  }

  return { state, dispatch };
};

const createProvider = appReducer => ({ children }) => {
  const store = createStore(appReducer);
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
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

export { createProvider, connect, combineReducers };
