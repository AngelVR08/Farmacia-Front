import React from 'react';
import { Link } from 'react-router-dom';

const AuthHeader = () => {
  return (
    <header className="header">
      <h1>Farmacia Cristopher</h1>
      <nav>
        <Link to="/login">Inicia Sesión</Link>
        <Link to="/register">Regístrate</Link>
      </nav>
    </header>
  );
};

export default AuthHeader;
