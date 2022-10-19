import React, { Fragment } from 'react';

const LoginButton = () => {
  return (
    <Fragment>
      <a href="/auth/linkedin" className='linkedin-login'>
        <img className='linkedin-login-img'
          src='/assets/loginicon.png'
          height='50'
          alt='Trackplications Logo' />
      </a>
    </Fragment>
  );
};

export default LoginButton;