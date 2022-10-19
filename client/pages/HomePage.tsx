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
        <h1><img
          className='hero-logo'
          src='/assets/tracklogo2.png'
          height='60'
          alt='Trackplications'
        /></h1>
        <p>Stay motivated by tracking your progress during your job search.</p>
      </section>
      <section className='landing-page-login'>
        <LoginButton />
      </section>
      <section className="landing-page-content">
        <p> Its as simple as using a spreadsheet, but with a just enough structure 
          to keep you organized. See all of your apps at a glance, and update 
          them in just 2 clicks. 
        </p>
        <p>
          Got an offer? Congrats! Keep track of details like salary, offers, 
          and start dates so you can easily pick the best option for you.
        </p>
      </section>
    </article>
  );
};

export default HomePage;
