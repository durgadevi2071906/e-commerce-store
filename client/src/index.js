import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ScrollTop from './Helper/ScrollToTop';
import CartsProvider from './Context/Carts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <CartsProvider>
        <ScrollTop/>
        <App/>
      </CartsProvider>
  </BrowserRouter>
);
