import React from 'react';

const List = ({ data, displayAttribute, ...rest }) => (
  <ul {...rest}>
    {data.map((el, index) => (
      <li key={index}>{el[displayAttribute]}</li>
    ))}
  </ul>
);

export default List;
