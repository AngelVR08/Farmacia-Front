import React from 'react';
import { Link } from 'react-router-dom';
const RegisterForm = ({ name, setName, email, setEmail, password, setPassword, onSubmit, error }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="register-form">
      <h2>Crear Cuenta</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Nombre</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre" 
            required
          />
        </div>
        <div className="form-field">
          <label>Correo Electrónico</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo" 
            required
          />
        </div>
        <div className="form-field">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña" 
            required
          />
        </div>
        <button className="btn" type="submit">Crear Cuenta</button>
      </form>
      <div className="link-container">
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registerAdmin">Registrarse como Empleado</Link>
        </div>
    </div>
  );
};

export default RegisterForm;
