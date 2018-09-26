import React from 'react';
import { connect } from './maze';

const App = ({ users, set }) => [
  <ul key={0}>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>,
  <button
    key={1}
    onClick={() => {
      const newUsers = [
        ...users,
        {
          id: new Date().getTime(),
          name: 'Added afterwards!'
        }
      ];
      set('users', newUsers);
    }}
  >
    Add user
  </button>
];

const mapStateToProps = store => {
  return { users: store.users };
};

export default connect(mapStateToProps)(App);
