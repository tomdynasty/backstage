import React from 'react';
import mockAxios from 'axios';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import '../../TestsMock/matchMediaMock';
import Login from './Login';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('axios');

test('取得登入頁面文字', () => {
  render(<Login />);
  const header = screen.getByText(/後台管理系統/i);
  expect(header).toBeInTheDocument();
});

test('登入成功，導轉到 payment 頁面', async () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText('帳號');
  const passwordInput = screen.getByLabelText('密碼');

  fireEvent.change(usernameInput, { target: { value: 'user' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  // mock login API
  const loginResponse = { token: 'iamtoken' };
  mockAxios.post.mockResolvedValueOnce({ data: loginResponse });
  fireEvent.click(screen.queryByText('登 入'));

  await waitFor(() => {
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/payment');
  });
});
