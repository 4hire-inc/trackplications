import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { EditAppProps, AppAttributeType } from '../types';

function EditAppDisplay (props: (EditAppProps)) {
  const navigate = useNavigate();
  const appTitle = `${props.activeApp.company}: ${props.activeApp.position}`;
  const localActiveApp = JSON.parse(JSON.stringify(props.activeApp));

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

  const handleSubmit = () => {
    props.setActiveApp(localActiveApp);
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
