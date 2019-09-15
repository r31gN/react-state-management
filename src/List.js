import React from 'react';

const List = ({ data, displayAttribute, ...rest }) => {
  if (!data) {
    return <p>Fetching data...</p>;
  }

  return (
    <ul {...rest}>
      {data.map((el, index) => (
        <li key={index}>{el[displayAttribute]}</li>
      ))}
    </ul>
  );
};

export default React.memo(List);
