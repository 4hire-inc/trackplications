import React from 'react';
import { AppAttributeProps } from 'client/types';

const AppAttribute = (props: AppAttributeProps) => {
  let [type, value] = props.appAttribute;
  if (type === 'status_name') type = 'Status'
  else type = type[0].toUpperCase() + type.slice(1);
  return (
    <li className='appAttributeWrapper'>
      <h4>{type}:</h4>
      <div style={{whiteSpace: 'pre-line'}}>{value}</div>
    </li>
  );
};

export default AppAttribute;