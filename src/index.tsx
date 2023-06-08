import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './assets/index.css';
import Router from './components/router/Router';
import Notification from './components/ui/notification/Notification';
import AuthProvider from './provider/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <AuthProvider>
      <Notification>
        <Router />
      </Notification>
    </AuthProvider>
  </HashRouter>
);
