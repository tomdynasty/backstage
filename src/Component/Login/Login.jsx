import React from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';
import '../../SCSS/Component/login.scss';

function Login(props) {
  return (
    <Form
      name="basic"
      className='login-form'
    >
      <Typography.Title>後台管理系統</Typography.Title>
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
