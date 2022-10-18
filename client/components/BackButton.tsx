import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link to="/summary"><button>Back</button></Link>
  );
};

export default BackButton;