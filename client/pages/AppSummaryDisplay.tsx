import React from 'react';
import ApplicationListItem from '../components/ApplicationListItem';
import { useNavigate } from 'react-router-dom';
import type { AppsSummaryType, ActiveApp } from '../types';

const AppSummaryDisplay = (props: (AppsSummaryType) ) => {
  // props: appsList, setActiveApp
  const navigate = useNavigate();
  const appsArray: JSX.Element[] = [];
  props.appsList.forEach((appInfo:ActiveApp, i:number) => {
    appsArray.push(<ApplicationListItem key={i} appInfo={appInfo} setActiveApp={props.setActiveApp} />);
  });


  return (
    <React.Fragment>
      <button
        type='button'
        className='add-app-button'
        onClick={() => {
          navigate('/addapp');
        }}
      >
        {'+ Add Application'}
      </button>
      <div className="app-summary-heading"><h2>Your Applications</h2></div>
      <div className='table-container'>

        <div className='heading-row'>
          <span className='table-heading'>Company</span>
          <span className='table-heading'>Position</span>
          <span className='table-heading'>Location</span>
          <span className='table-heading'>Status</span>
        </div>
        <div className='center'>
          {appsArray.length < 1 ? 'You don\'t have any applications.' : appsArray}
        </div>
      </div>
    </React.Fragment>
    
  );
};

export default AppSummaryDisplay;
