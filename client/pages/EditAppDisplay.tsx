import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { EditAppProps, AppAttributeType, ActiveApp } from '../types';
import { activeAppMock } from 'client/mockData';

function EditAppDisplay (props: (EditAppProps)) {
  const navigate = useNavigate();
  const appTitle = `${props.activeApp.company}: ${props.activeApp.position}`;
  const localActiveApp:ActiveApp = JSON.parse(JSON.stringify(props.activeApp));
  const localAppsList = JSON.parse(JSON.stringify(props.appsList));
  // create an array of form input components from the activeApp object in props.
  // const attributes: AppAttributeType[] = Object.entries(props.activeApp);
  const listAttributes: React.ReactElement[] = [];
  const fields: string[] = [
    'company',
    'location',
    'position',
    'notes',
  ];
  const statuses: {[key: string] : string} = {
    1: 'Offer Accepted',
    2: 'Negotiating',
    3: 'Offer Received',
    4: 'Interviews Done',
    5: 'Interviewing',
    6: 'Application Sent',
    7: 'Drafting',
    8: 'Offer Declined',
    9: 'Rejected',
    10: 'No Response'
  };
  fields.forEach(
    (name, i:number) => {
      if (name !== 'notes') listAttributes.push(
        <form key={i} className="editFormInputContainer">
          <label htmlFor={name}>{name[0].toUpperCase()+name.slice(1)}:</label>
          <input 
            key={i} 
            id={name} 
            name={name} 
            defaultValue={props.activeApp[name]} 
            onChange={(e) => localActiveApp[name] = e.target.value
            }
          />
        </form>
      );

      else {
        listAttributes.push(
          <form key={i} className="editFormInputContainer">
            <label htmlFor={name}>{name[0].toUpperCase()+name.slice(1)}:</label>
              <textarea
                rows= "10"
                key={i} 
                id={name} 
                name={name} 
                defaultValue={props.activeApp[name]} 
                onChange={(e) => localActiveApp[name] = e.target.value
                }
              ></textarea>
          </form>
        );
      }
    }
  );

  // updates the AppList and ActiveApp state objects, and pushes AppList to the DB.
  const handleSubmit = () => {
    const appListIndex = localAppsList.indexOf(
      localAppsList.find((el: ActiveApp) => el.app_id === localActiveApp.app_id)
    );
    props.setActiveApp(localActiveApp);
    localAppsList[appListIndex] = localActiveApp;
    props.updateAppsList(localAppsList);
    console.log(localActiveApp);
    axios.patch('/api/app', localActiveApp).then((res) => {
      localAppsList[appListIndex] = res.data;
      props.updateAppsList(localAppsList);
    });

    navigate('/appdetail');
  };

  return (
    <div className="editAppContainer">
      
      <form onSubmit={handleSubmit}>
        <div className="editAppButtonContainer">
          <button 
            className="back-button" 
            onClick={() => navigate('/appdetail')}
          >
            &#171;
          </button>
          <h2>Edit {appTitle}</h2>
          <button className="done-button" type="submit">&#10003;</button>
        </div>
        <ul className="editAppAttributesContainer">
          {listAttributes}
          <form className="editFormInputContainer">
            <label htmlFor="status">Status:</label>
            <select onChange={
              (e) => {
                localActiveApp.status_rank = e.target.value;
                localActiveApp.status_name = statuses[e.target.value];
              }
            } name="status" id="status" defaultValue={localActiveApp.status_rank}>
              <option value="">Please choose an option</option>
              <option value="1">Offer Accepted</option>
              <option value="2">Negotiating</option>
              <option value="3">Offer Received</option>
              <option value="4">Interviews Done</option>
              <option value="5">Interviewing</option>
              <option value="6">Application Sent</option>
              <option value="7">Drafting</option>
              <option value="8">Offer Declined</option>
              <option value="9">Rejected</option>
              <option value="10">No Response</option>
            </select></form>
        </ul>
      </form>
    </div>
  );
}

export default EditAppDisplay;
