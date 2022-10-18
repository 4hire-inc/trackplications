import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { AppsListProps, AppAttributeType } from '../types';

function AddAppDisplay (props: AppsListProps) {
  const navigate = useNavigate();
  const appTitle = 'Create new Application';
  const localAppsList = JSON.parse(JSON.stringify(props.appsList));
  const newApp = JSON.parse(JSON.stringify(props.activeApp));
  // create an array of form input components from the empty activeApp object in props.
  const attributes: AppAttributeType[] = Object.entries(newApp);
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
            onChange={(e) => newApp[name] = e.target.value}
          />
        </li>
      );
    }
  );

  const handleSubmit = () => {
    props.updateAppsList([...localAppsList, newApp]);
    navigate('/summary');
  };

  return (
    <div className="editAppContainer">
      
      <form onSubmit={handleSubmit}>
        <div className="editAppButtonContainer">
          <button onClick={() => navigate('/summary')}>Back</button>
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

export default AddAppDisplay;
