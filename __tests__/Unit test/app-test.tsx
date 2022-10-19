import React from 'react';
import { render, screen } from '@testing-library/jest-dom';
import App from '../../client/App';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

describe('App', () => {
  test('renders App page', () => {
    const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
});
