import React from 'react';
import type { ApplicationListItemType } from '../types';

const ApplicationListItem = (props: ApplicationListItemType) => {
  // props: appInfo
  const { company, position, location, status_name } =
      props.appInfo;
  return (
    <div className='content-row'>
      <span className='table-item'>{company}</span>
      <span className='table-item'>{position}</span>
      <span className='table-item'>{location}</span>
      <span className='table-item'>${status_name}</span>
    </div>
  );
};

export default ApplicationListItem;
