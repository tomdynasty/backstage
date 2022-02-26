import React from 'react';
import {
  Form, Input, Button, Typography, message,
} from 'antd';
import '../../SCSS/Component/login.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import callPostLogin from '../../API/auth';

function Login() {
  const navigate = useNavigate();

  /**
   * 登入
   * @param {object} val
   */
  const handleLogin = (val) => {
    if (!val.username || !val.password) {
      message.error('請輸入帳號與密碼');
      return;
    }

    callPostLogin(val.username, val.password)
      .then((res) => {
        navigate('/payment');
      })
      .catch((error) => {
        const { status, data } = error.response;
        const { detail } = data;
        console.log(`[${status}] ${data.message || detail}`);
        message.error(`[${status}] ${data.message || detail}`);
      });
  };

  return (
    <Form
      name="basic"
      className='login-form'
      onFinish={handleLogin}
    >
      <Typography.Title>後臺管理系統</Typography.Title>
      <Form.Item label="帳號" name="username" >
        <Input />
      </Form.Item>
      <Form.Item label="密碼" name="password" className="password" >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 9, span: 15 }}>
        <Button type="primary" htmlType="submit" className="login-button">
          登入
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.object,
};
