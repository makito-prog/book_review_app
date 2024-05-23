import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouterをimport
import { Login } from './pages/Login';

describe('Login component', () => {
  test('Is there a login form?', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    // ログインフォームが存在するかどうかを確認
    const mailAddressInput = screen.getByLabelText('Mailaddress');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: 'ログイン' });

    expect(mailAddressInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});