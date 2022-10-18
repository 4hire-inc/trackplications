import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = (props: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      navigate('/summary');
    }
  }, []);

  return (
    <React.Fragment>
      <div>HomePage</div>
    </React.Fragment>
  );
};

export default HomePage;
