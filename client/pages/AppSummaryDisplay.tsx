import React from 'react';
import ApplicationListItem from '../components/ApplicationListItem';
import { AppsSummaryPropsType } from '../types';

const AppSummaryDisplay = (props: AppsSummaryPropsType ) => {
  // props: appsList, setActiveApp
  const appsArray: JSX.Element[] = [];
  props.appsList.forEach((appInfo, i) => {
    appsArray.push(<ApplicationListItem key={i} appInfo={appInfo} />);
  });

  return (
    <React.Fragment>
      <div>AppSummaryDisplay</div>
      <ul>
        {appsArray}
      </ul>
    </React.Fragment>
    
  );
};

export default AppSummaryDisplay;
