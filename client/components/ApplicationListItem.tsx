import React from 'react';
import type { ApplicationListItemType } from '../types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ActiveApp } from '../types';

const ApplicationListItem = (props: ApplicationListItemType) => {
  // props: appInfo, setActiveApp
  const navigate = useNavigate();
  const { company, position, location, status_name, app_id } =
      props.appInfo;
  let localAppsList = JSON.parse(JSON.stringify(props.appsList));

  const handleClick = () => {
    console.log('clicked');
    props.setActiveApp(props.appInfo);
    navigate('/appdetail');
  };

  const handleDelete = async () => {
    console.log(app_id);
    const response = axios.delete(`/api/app/${app_id}`);
    if ((await response).data.confirmation) {
      const appListIndex = localAppsList.indexOf(
        localAppsList.find((el: ActiveApp) => el.app_id === app_id)
      );
      localAppsList = [...localAppsList.slice(0, appListIndex), ...localAppsList.slice(appListIndex + 1)];
      props.updateAppsList(localAppsList);
    }
  };
  
  return (
    <div className='content-row' onClick={() => handleClick()}>
      <span className='table-item'>{company}</span>
      <span className='table-item'>{position}</span>
      <span className='table-item'>{location}</span>
      <span className='table-item'>{status_name}</span>
      <span className='table-item'><a className='delete-app' onClick={handleDelete}>Delete App</a></span>
    </div>
  );
};

export default ApplicationListItem;
