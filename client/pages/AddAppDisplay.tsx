import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { AppsListProps } from '../types';

function AddAppDisplay (props: AppsListProps) {
  const navigate = useNavigate();
  const appTitle = 'Add New Application';
  // const localAppsList = JSON.parse(JSON.stringify(props.appsList));
  const newApp: Record<string, unknown> = {
    company: '',
    location: '',
    position: '',
    notes: '',
    status_id: '',
    statis: ''
  };
  // create an array of form input components from the empty activeApp object in props.
  const listAttributes: React.ReactElement[] = [];
  const fields: string[] = [
    'company',
    'location',
    'position',
    'notes',
  ];
  const statuses = {
    '1': 'Application Sent',
    '2': 'Online Assessment',
    '3': 'Phone Interview',
    '4': 'Onsite Interview',
    '5': 'Offer Received'
  };
  fields.forEach(
    (name, i:number) => {
      listAttributes.push(
        <li key={i} className="editFormInputContainer">
          <label htmlFor={name}>{name[0].toUpperCase()+name.slice(1)}:</label>
          <input 
            key={i} 
            id={name} 
            name={name} 
            defaultValue=''
            onChange={(e) => newApp[name] = e.target.value}
          />
        </li>
      );
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('body', newApp);
    const response = await axios.post('/api/app', newApp);
    console.log('response', response);
    navigate('/summary');
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
          <li className="editFormInputContainer">
            <label htmlFor="status">Status:</label>
            <select onChange={
              (e) => {
                newApp.status_rank = e.target.value;
                newApp.status_name = statuses[e.target.value];
              }
            } name="status" id="status">
              <option value="">Please choose an option</option>
              <option value="1">Application Sent</option>
              <option value="2">Online Assessment</option>
              <option value="3">Phone Interview</option>
              <option value="4">Onsite Interview</option>
              <option value="5">Offer Received</option>
            </select></li>
        </ul>
        

      </form>
    </div>
  );
}

export default AddAppDisplay;
