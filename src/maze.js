import React, { useReducer, useContext } from 'react';
import { reducer, initialState } from './Reducers';

const Ctx = React.createContext();
let prevState = null;
let dispatch = null;

const createStore = (reducer, initialState) => {
  const [state, _dispatch] = useReducer(reducer, initialState);
  dispatch = action => {
    if (process.env.NODE_ENV === 'development' && prevState) {
      console.group(
        `Update occured because of dispatching action '${action.type}'.`
      );
      console.log(`Before update: `, prevState);
      console.log(`After update: `, state);
      console.groupEnd();
    }

    _dispatch(action);
  };

  prevState = { ...state };

  return { state, dispatch };
};

const createProvider = () => ({ children }) => {
  const store = createStore(reducer, initialState);
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

const AppProvider = createProvider();

export { AppProvider, connect };
