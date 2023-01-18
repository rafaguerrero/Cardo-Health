import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoutes from '../PrivateRoutes';

import Login from '../../pages/Login';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';

import './styles.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route exact title="Home" path="/" element={<Home/>} />
          <Route path="/*" title="Not Found" element={<NotFound/>} />
        </Route>

        <Route exact title="Login" path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
