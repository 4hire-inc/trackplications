import React from 'react';
import { HeaderProps } from '../types';
import { Link } from 'react-router-dom';

const HeaderDisplay = (props: HeaderProps) => {
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
          <div>
              Welcome, Guest!  {' '}
            <button className="linkedin-login" type='submit'>
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
