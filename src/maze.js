import React, { useReducer, useContext } from 'react';
import { reducer, initialState } from './Reducers';

const createStore = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (process.env.NODE_ENV === 'development') {
    console.group(`Update occured.`);
    console.log(state);
    console.groupEnd();
  }

  return { state, dispatch };
};

const Ctx = React.createContext();

const createProvider = () => ({ children }) => {
  const store = createStore(reducer, initialState);
  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
};

const AppProvider = createProvider();

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

export { AppProvider, connect };
