import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Login from '../Component/Login/Login';
import Order from '../Component/Order/Order';
import '../SCSS/base/normalize.scss';
import '../SCSS/variable.scss';
import 'antd/dist/antd.min.css';
import RequireAuth from '../Component/RequireAuth';

export default function PageRouter() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path='/order' element={<RequireAuth/>}>
            <Route exact path="/order" element={<Order/>}/>
          </Route>
        </Routes>
    </Router>
  );
}
