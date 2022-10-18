import React from 'react';
import type { HeaderProps } from '../types';
import { Link, useNavigate } from 'react-router-dom';

const HeaderDisplay = (props: (HeaderProps)) => {
  const navigate = useNavigate();
  return (
    <div className='nav'>
      <div className='navleft'>
        <Link to='/' className='nav-logo'>
          <img
            className='logo'
            src='/assets/tracklogo.png'
            height='30'
            alt='Trackplications Logo'
          />
        </Link>
      </div>
      <div className='navright'>
        {sessionStorage.getItem('loggedIn') ? (
          <div>
              Welcome back,{' '}
            <strong>{sessionStorage.getItem('username')}</strong>!{' '}
            {/* <button onClick={this.props.onLogOut} type='submit'>
              Log Out
            </button> */}
          </div>
        ) : (
          <div className="center">
              Welcome, {props.userInfo.userName}!  {' '}
            <button className="linkedin-login" onClick={() => {navigate('/auth/linkedin');}}>
              <img
                className='logo'
                src='/assets/loginicon.png'
                height='30'
                alt='Trackplications Logo'
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDisplay;
