import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './Context/AuthContext';
import ScrollTop from './Helper/ScrollToTop';
import CartsProvider from './Context/Carts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartsProvider>
        <ScrollTop/>
        <App/>
      </CartsProvider>
    </AuthProvider>
  </BrowserRouter>
);
