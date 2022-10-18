import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { EditAppProps, AppAttributeType, ActiveApp } from '../types';

function EditAppDisplay (props: (EditAppProps)) {
  const navigate = useNavigate();
  const appTitle = `${props.activeApp.company}: ${props.activeApp.position}`;
  const localActiveApp = JSON.parse(JSON.stringify(props.activeApp));
  const localAppsList = JSON.parse(JSON.stringify(props.appsList));

  // create an array of form input components from the activeApp object in props.
  const attributes: AppAttributeType[] = Object.entries(props.activeApp);
  const listAttributes: React.ReactElement[] = [];
  attributes.forEach(
    ([name, value], i:number) => {
      listAttributes.push(
        <li key={i} className="editFormInputContainer">
          <label htmlFor={name}>{name}:</label>
          <input 
            key={i} 
            id={name} 
            name={name} 
            defaultValue={value} 
            onChange={(e) => localActiveApp[name] = e.target.value}
          />
        </li>
      );
    }
  );

  // updates the AppList and ActiveApp state objects, and pushes AppList to the DB.
  const handleSubmit = () => {
    const appListIndex = localAppsList.indexOf(
      localAppsList.find((el: ActiveApp) => el.id === localActiveApp.id)
    );
    props.setActiveApp(localActiveApp);
    // ! this should be replaced when the patch route is complete
    localAppsList[appListIndex] = localActiveApp;
    props.updateAppsList(localAppsList);
    // ! this should replace the above logic when the patch route is complete
    // axios.patch('/api/app', localAppsList).then((res) => {
    //   console.log('res data', res.data);
    //   props.updateAppsList(res.data);
    // });

    navigate('/appdetail');
  };

  return (
    <div className="editAppContainer">
      
      <form onSubmit={handleSubmit}>
        <div className="editAppButtonContainer">
          <button onClick={() => navigate('/appdetail')}>Back</button>
          <h2>Edit {appTitle}</h2>
          <button type="submit">Done</button>
        </div>
        <ul className="editAppAttributesContainer">
          {listAttributes}
        </ul>
      </form>
    </div>
  );
}

export default EditAppDisplay;
