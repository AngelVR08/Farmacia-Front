import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/organisms/LoginFormAdmin';

const url = import.meta.env.VITE_URL_API;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch(`${url}employee/login`, requestOptions);
      if (!response.ok) {
        throw new Error('Error en el inicio de sesión');
      }
      const result = await response.json();

      localStorage.setItem('auth', 'true'); 
      localStorage.setItem('user', email); 
      localStorage.setItem('token', result.token); 
      localStorage.setItem('rol', result.rol);
      navigate('/admin/add-product', { replace: true });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-page">
      <main>
        <LoginForm 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          onSubmit={handleLogin} 
          error={error} 
        />
      </main>
    </div>
  );
};

export default LoginPage;
