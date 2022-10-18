import React from 'react';
import type { ApplicationListItemType } from '../types';
import { useNavigate } from 'react-router-dom';

const ApplicationListItem = (props: ApplicationListItemType) => {
  // props: appInfo, setActiveApp
  const navigate = useNavigate();
  const { company, position, location, status_name } =
      props.appInfo;

  const handleClick = () => {
    console.log('clicked');
    props.setActiveApp(props.appInfo);
    navigate('/appdetail');
  };
  
  return (
    <div className='content-row' onClick={() => handleClick()}>
      <span className='table-item'>{company}</span>
      <span className='table-item'>{position}</span>
      <span className='table-item'>{location}</span>
      <span className='table-item'>{status_name}</span>
    </div>
  );
};

export default ApplicationListItem;
