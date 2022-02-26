import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Login from '../Component/Login/Login';
import UserPayment from '../Component/UserPayment/UserPayment';
import '../SCSS/base/normalize.scss';
import '../SCSS/variable.scss';
import 'antd/dist/antd.less';

export default function PageRouter() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/payment" element={<UserPayment/>}/>
        </Routes>
    </Router>
  );
}
