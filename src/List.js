import React from 'react';

const List = ({ data, displayAttribute }) => (
  <ul>
    {data.map((el, index) => (
      <li key={index}>{el[displayAttribute]}</li>
    ))}
  </ul>
);

export default List;
