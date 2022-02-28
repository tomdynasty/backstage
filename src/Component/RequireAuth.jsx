import React, { useEffect, useState } from 'react';
import {
  Outlet,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { message, Spin } from 'antd';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

export default function RequireAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setAuth] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const cookie = new Cookies();
    if (cookie.get('user')) {
      setAuth(true);
      setIsLoading(false);
      return;
    }
    message.warn('尚未進行帳密驗證');
    navigate('/');
  }, [navigate]);
  if (isLoading) {
    return <Spin tip="載入後臺管理頁面內容..." id="auth-spin"/>;
  }
  return (
    isAuth ? <Outlet /> : <Navigate to="/" />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.elementType,
};
