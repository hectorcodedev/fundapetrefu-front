import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;