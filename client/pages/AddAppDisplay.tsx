import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { AppsListProps } from '../types';

function AddAppDisplay (props: AppsListProps) {
  const navigate = useNavigate();
  const appTitle = 'Add New Application';
  // const localAppsList = JSON.parse(JSON.stringify(props.appsList));
  const newApp: Record<string, unknown> = {};
  // create an array of form input components from the empty activeApp object in props.
  const listAttributes: React.ReactElement[] = [];
  const fields: string[] = [
    'company',
    'location',
    'position',
    'notes',
    'status_name',
    'status_rank'
  ];
  fields.forEach(
    (name, i:number) => {
      listAttributes.push(
        <form key={i} className="editFormInputContainer">
          <label htmlFor={name}>{name}:</label>
          <input 
            key={i} 
            id={name} 
            name={name} 
            defaultValue=''
            onChange={(e) => newApp[name] = e.target.value}
          />
        </form>
      );
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(newApp);
    const response = await axios.post('/api/app', newApp);
    console.log(response);
    // navigate('/summary');
  };

  return (
    <div className="editAppContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="editAppButtonContainer">
          <button 
            className="back-button" 
            onClick={() => navigate('/summary')}
          >
            &#171;
          </button>
          <h2>{appTitle}</h2>
          <button className="done-button" type="submit">&#10003;</button>
        </div>
        <ul className="editAppAttributesContainer">
          {listAttributes}
        </ul>
      </form>
    </div>
  );
}

export default AddAppDisplay;
