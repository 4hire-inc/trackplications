import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {
  return (
    <Link to="/"><button>Back</button></Link>
  );
};

export default BackButton;