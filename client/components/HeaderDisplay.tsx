import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import type { HeaderProps } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const HeaderDisplay = (props: (HeaderProps)) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove('name');
    Cookies.remove('code');
    Cookies.remove('email');
    Cookies.remove('isLoggedIn');
    sessionStorage.clear();
    await axios.post('/auth/logout');
    navigate('/');
  };


  return (
    <div className='nav'>
      <div className='navleft'>
        <Link to='/' className='nav-logo'>
          <img
            className='logo'
            src='/assets/tracklogo2.png'
            height='30'
            alt='Trackplications Logo'
          />
        </Link>
      </div>
      <div className='navright'>
        {sessionStorage.getItem('isLoggedIn') ? (
          <div>
              Welcome back, {' '}
            <strong>{sessionStorage.getItem('name')}</strong>!
            <button className="logout-button" onClick={() => handleLogout()} type='submit'>
              Log Out
            </button>
          </div>
        ) : (
          <div className="center">
              Welcome!
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDisplay;
