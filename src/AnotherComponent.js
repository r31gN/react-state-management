import React, { useEffect, Suspense, lazy } from 'react';
import { connect } from './maze';
import List from './List';

// Not much benefit, because `List` has already been imported
// It is useful as a demo though, for other component examples
const LazyList = lazy(() => import('./List'));

const Loading = React.memo(() => <p>Loading ...</p>);

const AnotherComponent = ({ users, githubUsers, dispatch, ...rest }) => {
  useEffect(() => {
    (async () => {
      const res = await fetch('https://api.github.com/users');
      const json = await res.json();
      dispatch('SET_GITHUB_USERS', json);
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
      <p style={{ marginBottom: '2rem' }}>GitHub users:</p>
      <Suspense fallback={<Loading />}>
        <LazyList data={githubUsers} displayAttribute="login" />
      </Suspense>
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users,
  githubUsers: state.githubUsers
});

export default connect(mapStateToProps)(AnotherComponent);
