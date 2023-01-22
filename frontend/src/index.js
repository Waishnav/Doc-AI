import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import App from './App';

import { AuthProvider } from "./context/auth";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>,
  </React.StrictMode>
);

