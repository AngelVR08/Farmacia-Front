import React from 'react';
import UserInfo from '../molecules/UserInfo';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
const UserSummary = ({ user }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      localStorage.clear()
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="user-summary">
    <button className="cerrar" onClick={handleLogoutClick}>
      Cerrar sesión
    </button>
    <UserInfo user={user} />
  </div>
  );
};

export default UserSummary;
