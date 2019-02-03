import React, { useState } from 'react';
import { connect } from 'simpply';
import List from './List';

const App = ({ users, dispatch, ...rest }) => {
  const [user, setUser] = useState('');

  return (
    <div {...rest}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '2rem'
        }}
      >
        <label style={{ marginRight: '1rem' }}>Add user:</label>
        <input
          style={{
            height: '2rem',
            border: '1px solid #eee',
            marginRight: '1rem',
            padding: '0 .75rem'
          }}
          type="text"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <button
          style={{
            background: '#333',
            color: '#fff',
            border: 'none',
            height: '2rem',
            padding: '0 1rem'
          }}
          onClick={() => {
            dispatch({
              type: 'ADD_USER',
              payload: {
                name: user
              }
            });
            setUser('');
          }}
        >
          Add
        </button>
      </div>
      <List data={users} displayAttribute="name" />
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(App);
