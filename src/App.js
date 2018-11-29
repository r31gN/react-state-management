import React, { useState } from 'react';

const UsersList = ({ users }) => (
  <ul>
    {users.map((user, index) => (
      <li key={index}>{user}</li>
    ))}
  </ul>
);

const App = () => {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);

  return (
    <main
      style={{
        padding: '10rem 0 0 10rem'
      }}
    >
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
            const newUsers = [...users, user];
            setUsers(newUsers);
          }}
        >
          Add
        </button>
      </div>
      <UsersList users={users} />
    </main>
  );
};

export default App;
