import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { AuthProps } from '../types';

const AuthenticationPage = (props: AuthProps) => {
  const navigate = useNavigate();
  const [timer, updateTimer] = useState(3);

  useEffect(() => {
    if (Cookies.get('code') && sessionStorage.getItem('isLoggedIn')) {
      navigate('/summary');
    } else {
      const cookie_code = Cookies.get('code') || '';
      const cookie_email = Cookies.get('email') || '';
      const cookie_name = Cookies.get('name') || '';
      props.updateUserInfo({
        userId: cookie_code,
        userName: cookie_name
      });
      sessionStorage.setItem('email', cookie_email);
      sessionStorage.setItem('code', cookie_code);
      sessionStorage.setItem('name', cookie_name);
      sessionStorage.setItem('isLoggedIn', 'true');
      startCountdown(2);
    }
  }, []);

  function startCountdown(seconds: number) {
    let counter = seconds;

    const interval = setInterval(() => {
      updateTimer(counter);
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        navigate('/summary');
      }
    }, 1000);
  }

  return (
    <div className="center">
      <h4>Successfully logged in with Linkedin. Redirecting you in {timer} seconds...</h4>
    </div>
  );
};

export default AuthenticationPage;
