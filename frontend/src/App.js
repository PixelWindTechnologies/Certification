import React from 'react';
import VerifyPage from './pages/VerifyPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  const path = window.location.pathname;
  if (path === '/admin') return <AdminPage />;
  return <VerifyPage />;
}

export default App;
