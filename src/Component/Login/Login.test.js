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
  const header = screen.getByText(/後臺管理系統/i);
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

test('[error] 未輸入帳號', async () => {
  render(<Login />);
  const passwordInput = screen.getByLabelText('密碼');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  // mock login API
  const loginResponse = { token: 'iamtoken' };
  mockAxios.post.mockResolvedValueOnce({ data: loginResponse });
  fireEvent.click(screen.queryByText('登 入'));

  await waitFor(() => {
    expect(screen.getByText('請輸入帳號與密碼')).toBeInTheDocument();
  });
});

test('[error] 未輸入密碼', async () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText('帳號');
  fireEvent.change(usernameInput, { target: { value: 'user' } });

  // mock login API
  const loginResponse = { token: 'iamtoken' };
  mockAxios.post.mockResolvedValueOnce({ data: loginResponse });
  fireEvent.click(screen.queryByText('登 入'));

  await waitFor(() => {
    expect(screen.getByText('請輸入帳號與密碼')).toBeInTheDocument();
  });
});

test('[error] 404 error 路徑錯誤', async () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText('帳號');
  const passwordInput = screen.getByLabelText('密碼');

  fireEvent.change(usernameInput, { target: { value: 'user' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  fireEvent.click(screen.queryByText('登 入'));

  const error = {
    response: {
      status: 404,
      data: {
        detail: 'The route /auth_api/user/logi hasn\'t been found in the specification file',
      },
    },
  };
  mockAxios.post.mockRejectedValue(error);
  await waitFor(() => {
    const expectedText = '[404] The route /auth_api/user/logi hasn\'t been found in the specification file';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

test('[error] 400 api error', async () => {
  render(<Login />);
  const usernameInput = screen.getByLabelText('帳號');
  const passwordInput = screen.getByLabelText('密碼');

  fireEvent.change(usernameInput, { target: { value: 'user' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  fireEvent.click(screen.queryByText('登 入'));

  const error = {
    response: {
      status: 400,
      data: {
        message: 'invalid account',
      },
    },
  };
  mockAxios.post.mockRejectedValue(error);
  await waitFor(() => {
    const expectedText = '[400] invalid account';
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
