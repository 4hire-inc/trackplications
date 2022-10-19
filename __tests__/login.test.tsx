import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';
import LoginButton from '../client/components/LoginButton';


test('login link renders', async () => {
	render(<LoginButton />);
	expect(screen.getByRole('link')).toBeInTheDocument();
});

test('login link points to /auth/linkedin', async () => {
	render(<LoginButton />);
	expect(screen.getByRole('link')).toHaveAttribute('href', '/auth/linkedin');
});