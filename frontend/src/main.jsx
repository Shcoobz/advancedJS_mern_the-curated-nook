import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH } from './config/common/constants';

import '../index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={PATH.nested} element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
