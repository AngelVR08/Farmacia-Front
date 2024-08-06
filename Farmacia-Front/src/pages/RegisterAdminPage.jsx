import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/organisms/RegisterFormAdmin';

const url = import.meta.env.VITE_URL_API
const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      full_name: name,
      email: email,
      password: password,
      salary:0,
      position:"empleado",
      created_by: "admin"
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${url}employee/create`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en el registro');
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem('auth', 'true');
        navigate('/loginAdmin');
      })
      .catch((error) => {
        console.error(error);
        setError('Error en el registro');
      });
  };

  return (
    <div className="register-page">
      <main>
        <RegisterForm 
          name={name} 
          setName={setName} 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          onSubmit={handleRegister} 
          error={error} 
        />
      </main>
    </div>
  );
};

export default RegisterPage;
