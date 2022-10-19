import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppAttribute from '../components/AppAttribute';
import type { ActiveAppProps, AppAttributeType } from '../types';

function AppDetailDisplay (props: (ActiveAppProps)) {
  const navigate = useNavigate();
  const appTitle = `${props.activeApp.company}: ${props.activeApp.position}`;
  // create an array of <AppAttribute /> components from the activeApp object in props.
  const attributes: AppAttributeType[] = Object.entries(props.activeApp);
  const listAttributes: React.ReactElement[] = [];
  const displayAttributes = ['company', 'location', 'position', 'notes', 'status_name']
  attributes.forEach(
    (attribute: AppAttributeType, i:number) => {
      if (displayAttributes.includes(attribute[0])) listAttributes.push(<AppAttribute key={i} appAttribute={attribute} />);
    }
  );
  
  useEffect(() => {
    if (!sessionStorage.getItem('isLoggedIn')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="appDetailContainer">
      <div className="appDetailButtonContainer">
        <button 
          className="back-button" 
          onClick={() => navigate('/summary')}
        >
          &#171;
        </button>
        <h2>{appTitle}</h2>
        <button 
          className="edit-button" 
          onClick={() => navigate('/editapp')}
        >
          &#9998;
        </button>
      </div>
      <ul className='appDetailAttributesContainer'>
        {listAttributes}
      </ul>
    </div>
  );
}

export default AppDetailDisplay;
