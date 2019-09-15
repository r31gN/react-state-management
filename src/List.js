import React from 'react';
import Loading from './Loading';

const List = ({ data, displayAttribute, ...rest }) => {
  if (!data) {
    return <Loading />;
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
