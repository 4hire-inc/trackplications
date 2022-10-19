import React, { useEffect } from 'react';
import axios from 'axios';
import ApplicationListItem from '../components/ApplicationListItem';
import { useNavigate } from 'react-router-dom';
import type { AppsSummaryType, ActiveApp, AppsList } from '../types';

const AppSummaryDisplay = (props: (AppsSummaryType) ) => {
  // props: appsList, setActiveApp, updateAppsList
  const navigate = useNavigate();
  const appsArray: JSX.Element[] = [];
  props.appsList.forEach((appInfo:ActiveApp, i:number) => {
    appsArray.push(<ApplicationListItem key={i} appInfo={appInfo} setActiveApp={props.setActiveApp} appsList={props.appsList} updateAppsList={props.updateAppsList}/>);
  });

  const fetchApplications = () => {
    console.log('in fetch applications');
    axios.get('/api/app').then((res) => {
      console.log('res.data', res.data);
      props.updateAppsList(res.data);
    });
  };

  const updateAppsArray = (appsList: AppsList) => {
    appsList.forEach((appInfo:ActiveApp, i:number) => {
      appsArray.push(<ApplicationListItem key={i} appInfo={appInfo} setActiveApp={props.setActiveApp} appsList={props.appsList} updateAppsList={props.updateAppsList} />);
    });
  };

  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      navigate('/');
    }

    props.setActiveApp({
      app_id: '',
      user_id: '',
      company: '',
      location: '',
      position: '',
      notes: '',
      status_id: '',
      offer_id: '',
      modified_at: '',
      status_name: '',
      status_rank: 0,
      status_modifed_at: '' });

    fetchApplications();
    updateAppsArray(props.appsList);
  }, []);

  return (
    <React.Fragment>
      
      <div className="app-summary-heading">
        <h2>Your Applications</h2>
        <button
          type='button'
          className='add-app-button'
          onClick={() => {
            navigate('/addapp');
          }}
        >
          {'+'}
        </button>
      </div>
      <div className='heading-row'>
        <div className='app-info-row'>
          <span className='table-heading'>Company</span>
          <span className='table-heading'>Position</span>
          <span className='table-heading'>Location</span>
          <span className='table-heading'>Status</span>
        </div>
        <div className='table-heading'>Delete App</div>
      </div>
      {appsArray.length < 1 ? <div className="content-row">{'You don\'t have any applications.'}</div> : appsArray}
    </React.Fragment>
    
  );
};

export default AppSummaryDisplay;
