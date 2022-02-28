import React, { useEffect, useState } from 'react';
import {
  Outlet,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message, Spin } from 'antd';
import PropTypes from 'prop-types';
import { receiveUserInfo } from '../Redux/Action/User';

export default function RequireAuth({ ...rest }) {
  const [isAuth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const {
    userInfo,
  } = useSelector((state) => ({
    userInfo: state.userInfoReducer.userInfo,
  }));

  useEffect(() => {
    const checkAuth = async () => {
      if (userInfo.name) {
        setAuth(true);
        return;
      }
      message.warn('尚未進行帳密驗證');
    };
    const fetchingUserInfo = async () => {
      await dispatch(receiveUserInfo());
      await checkAuth();
      setIsLoading(false);
    };
    fetchingUserInfo();
  }, [dispatch, userInfo.name]);
  if (isLoading) {
    return <Spin tip="載入後臺管理頁面內容..." id="auth-spin"/>;
  }
  return (
    isAuth ? <Outlet {...rest} /> : <Navigate to="/" />
  );
}

RequireAuth.propTypes = {
  children: PropTypes.elementType,
};
