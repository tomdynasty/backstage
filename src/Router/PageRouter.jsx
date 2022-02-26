import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Login from '../Component/Login/Login';
import '../SCSS/base/normalize.scss';
import '../SCSS/variable.scss';

export default function PageRouter() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
        </Routes>
    </Router>
  );
}
