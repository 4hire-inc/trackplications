import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';


const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isLoggedIn')) {
      navigate('/summary');
    }
  }, []);

  return (
    <article className="landing-page">
      <section className="landing-page-hero">
        <img
          className='hero-logo'
          src='/assets/tracklogo2.png'
          height='100'
          alt='Trackplications'
        />
        <p>Stay motivated by tracking your progress during your job search.</p>
        <section className='landing-page-login'>
          <LoginButton />
        </section>
      </section>
    </article>
  );
};

export default HomePage;
