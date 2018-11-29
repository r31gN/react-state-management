import React from 'react';

const UsersList = ({ users }) => (
  <ul>
    {users.map((user, index) => (
      <li key={index}>{user}</li>
    ))}
  </ul>
);

export default UsersList;
