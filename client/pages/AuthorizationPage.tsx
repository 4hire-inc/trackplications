import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import type { AuthProps } from '../types';

const AuthorizationPage = (props: AuthProps) => {
  const navigate = useNavigate();
  return (
    <div>AuthorizationPage</div>
  );
};

export default AuthorizationPage;
