import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginButton from '../client/components/LoginButton';

test('login button renders', async () => {
	const subject = render(<LoginButton />);
});
