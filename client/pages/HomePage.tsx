import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


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
        <a href="/auth/linkedin" className='linkedin-login'>
          <img className='linkedin-login-img'
            src='/assets/loginicon.png'
            height='50'
            alt='Trackplications Logo' />
        </a>
      </section>
    </article>
  );
};

export default HomePage;
