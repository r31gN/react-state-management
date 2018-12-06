import React, { useReducer, useContext } from 'react';

const effectsToNameMap = new Map();

const throwError = (conditionToThrow, msg) => {
  if (conditionToThrow) {
    throw new Error(msg);
  }
};

const getVariableType = variable => {
  let toStr = Object.prototype.toString.call(variable);
  toStr = toStr.substring(1, toStr.length - 1);
  return toStr.split(' ')[1].toLowerCase();
};

const combineReducers = reducersObj => {
  // Verify that `reducersObj` is an Object
  throwError(
    getVariableType(reducersObj) !== 'object',
    `The argument passed to the 'combineReducers' function must be an Object.`
  );

  let globalEffects = {};
  let globalInitialState = {};

  Object.keys(reducersObj).forEach(key => {
    const currentReducer = reducersObj[key];

    // Verify that `currentReducer` is an Object
    throwError(
      getVariableType(currentReducer) !== 'object',
      `Expected ${key} to be an Object.`
    );

    const { effects, initialState } = currentReducer;

    // Verify that `currentReducer` has `effects` and `initialState` props
    throwError(
      !effects || !initialState,
      `Expected ${key} to have 'effects' and 'initialState' props.`
    );

    // Verify that `effects` prop is an Object
    throwError(
      getVariableType(effects) !== 'object',
      `Expected '${key}.effects' to be an Object.`
    );

    // Verify that `initialState` prop is not a Function
    throwError(
      getVariableType(initialState) === 'function',
      `Expected '${key}.initialState' to be a primitive type, Object or Array.`
    );

    globalEffects = { ...globalEffects, ...currentReducer.effects };
    globalInitialState[key] = currentReducer.initialState;

    Object.keys(currentReducer.effects).forEach(effectKey =>
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
  // Verify that `appReducer` is an Object
  throwError(
    getVariableType(appReducer) !== 'object',
    `The argument passed to the 'createStore' function must be an Object.`
  );

  const { globalEffects, globalInitialState } = appReducer;

  // Verify that `appReducer` has `globalEffects` and `globalInitialState` props
  throwError(
    !globalEffects || !globalInitialState,
    `Expected ${appReducer} to have 'globalEffects' and 'globalInitialState' props.`
  );

  if (!reducerFn) {
    reducerFn = (state, action) => {
      // Verify that `action` is an Object
      throwError(
        getVariableType(action) !== 'object',
        `Expected ${action} to be an Object.`
      );

      const { type, payload } = action;

      // Verify that `action` has `type` and `payload` props
      throwError(
        !type || !payload,
        `Expected ${action} to have 'type' and 'payload' props.`
      );

      // Verify that `type` prop is a String
      throwError(
        getVariableType(type) !== 'string',
        `Expected ${type} to be an String.`
      );

      // Verify that `payload` prop is not a Function
      throwError(
        getVariableType(payload) === 'function',
        `Expected 'payload' to be a primitive type, Object or Array.`
      );

      const fn = appReducer.globalEffects[type];
      const key = effectsToNameMap.get(type);

      return fn && typeof fn === 'function'
        ? { ...state, [key]: fn(state[key], payload) }
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
    const slicedState = mapStateToProps(state);

    // Verify that `slicedState` is an Object
    throwError(
      getVariableType(slicedState) !== 'object',
      `The result of calling 'mapStateToProps' function must be an Object.`
    );

    return <MemoComponent {...props} {...slicedState} dispatch={dispatch} />;
  };

  return EnhancedComponent;
};

export { createProvider, connect, combineReducers };
