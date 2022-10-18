import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = (props: any) => {
  return (
    <React.Fragment>
      <div>HomePage</div>
      <Link to='/summary'>Summary</Link>
    </React.Fragment>
  );
};

export default HomePage;
