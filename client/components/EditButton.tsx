import React from 'react';
import { Link } from 'react-router-dom';

const EditButton = () => {
  return (
    <Link to="/editapp"><button>Edit</button></Link>
  );
};

export default EditButton;