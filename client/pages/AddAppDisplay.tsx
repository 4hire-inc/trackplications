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
    status_name: '',
    status_rank: ''
  };
  // create an array of form input components from the empty activeApp object in props.
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
    7: 'Offer Declined',
    8: 'Rejected',
    9: 'No Response'
  };
  fields.forEach(
    (name, i:number) => {
      listAttributes.push(
        <form key={i} className="editFormInputContainer">
          <label htmlFor={name}>{name[0].toUpperCase()+name.slice(1)}
          {name !== 'notes' ? <span className="req">*</span> : ''}:</label>
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
    const errorMessage = document.querySelector('#error-message');
    if (!newApp.company || !newApp.location || !newApp.position || !newApp.status_rank) {
      if (errorMessage) errorMessage.innerHTML = 'Error: Please fill out all required fields.';
    } else {
      if (errorMessage) errorMessage.innerHTML = '';
      const response = await axios.post('/api/app', newApp);
      navigate('/summary');
    }
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
            <label htmlFor="status">Status<span className="req">*</span>:</label>
            <select onChange={
              (e) => {
                newApp.status_rank = e.target.value;
                newApp.status_name = statuses[e.target.value];
              }
            } name="status" id="status">
              <option value="">Please choose an option</option>
              <option value="1">Offer Accepted</option>
              <option value="2">Negotiating</option>
              <option value="3">Offer Received</option>
              <option value="4">Interviews Done</option>
              <option value="5">Interviewing</option>
              <option value="6">Application Sent</option>
              <option value="7">Offer Declined</option>
              <option value="8">Rejected</option>
              <option value="9">No Response</option>
            </select></li>
            <li id="error-message"></li>
        </ul>
      </form>
    </div>
  );
}

export default AddAppDisplay;
