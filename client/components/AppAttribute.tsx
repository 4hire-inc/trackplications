import React from 'react';
import { AppAttributeProps } from 'client/types';

const AppAttribute = (props: AppAttributeProps) => {
  const [type, value] = props.appAttribute;
  return (
    <li className='appAttributeWrapper'>
      <h4>{type}:</h4>
      <p>{value}</p>
    </li>
  );
};

export default AppAttribute;