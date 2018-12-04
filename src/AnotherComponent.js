import React, { useEffect, Suspense, lazy } from 'react';
import { connect } from './maze';
import List from './List';

// Not much benefit, because `List` has already been imported
// It is useful as a demo though, for other component examples
const LazyList = lazy(() => import('./List'));

const Loading = React.memo(() => <p>Loading ...</p>);

const AnotherComponent = ({ users, cnJokes, dispatch, ...rest }) => {
  useEffect(() => {
    (async () => {
      const res = await fetch('http://api.icndb.com/jokes/random/10');
      const json = await res.json();
      dispatch('SET_CN_JOKES', json.value);
    })();
  }, []);

  return (
    <div {...rest}>
      <p style={{ marginBottom: '2rem' }}>Local users:</p>
      <List
        style={{ marginBottom: '2rem' }}
        data={users}
        displayAttribute="name"
      />
      <p style={{ marginBottom: '2rem' }}>Chuck Norris jokes:</p>
      <Suspense fallback={<Loading />}>
        <LazyList data={cnJokes} displayAttribute="joke" />
      </Suspense>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
  cnJokes: state.cnJokes
});

export default connect(mapStateToProps)(AnotherComponent);
