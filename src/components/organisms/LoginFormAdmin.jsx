import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit, error }) => {
  return (
    <div className="login-form">
      <h2>Login Empleado</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="form-field">
          <label>Correo:</label>
          <input 
            type="name" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-field">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <button className="btn" type="submit">Login</button>
      </form>
      <div className="link-container">
          <Link to="/registerAdmin">Regístrate como Empleado</Link>
          <Link to="/login">Iniciar como Usuario</Link>
        </div>
    </div>
  );
};

export default LoginForm;
