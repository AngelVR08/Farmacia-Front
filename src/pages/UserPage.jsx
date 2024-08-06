// src/pages/UserPage.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import UserSummary from '../components/organisms/UserSummary';

const UserPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Error al decodificar el token', error);
      }
    }
  }, []);
  

  return (
    <div className="user-page">
      {user ? <UserSummary user={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default UserPage;
