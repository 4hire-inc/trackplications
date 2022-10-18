import React from 'react';
import BackButton from '../components/BackButton';
import EditButton from '../components/EditButton';
import AppAttribute from '../components/AppAttribute';
import type { ActiveAppProps, AppAttributeType } from '../types';

function AppDetailDisplay (props: (ActiveAppProps)) {

  const appTitle = `${props.activeApp.company}: ${props.activeApp.position}`;
  // create an array of <AppAttribute /> components from the activeApp object in props.
  const attributes: AppAttributeType[] = Object.entries(props.activeApp);
  const listAttributes: React.ReactElement[] = [];

  attributes.forEach(
    (attribute: AppAttributeType, i:number) => {
      listAttributes.push(<AppAttribute key={i} appAttribute={attribute} />);
    }
  );
  

  return (
    <div className="appDetailContainer">
      <div className="appDetailButtonContainer">
        <BackButton />
        <h2>{appTitle}</h2>
        <EditButton />
      </div>
      <ul className='appDetailAttributesContainer'>
        {listAttributes}
      </ul>
    </div>
  );
}

export default AppDetailDisplay;
