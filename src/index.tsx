import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/index.css';
import Router from './components/router/Router';
import Notification from './components/ui/notification/Notification';
import AuthProvider from './provider/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Notification>
        <Router />
      </Notification>
    </AuthProvider>
  </BrowserRouter>
);
