import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";

const url = import.meta.env.VITE_URL_API;
const LoginPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: fullName,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}client/logIn`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Credenciales inválidas");
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", fullName);
        localStorage.setItem("auth", "true");
        localStorage.setItem("rol", "user");
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        setError("Credenciales inválidas");
      });
  };

  return (
    <div className="login-page">
      <main>
        <LoginForm
          email={fullName} 
          setEmail={setFullName} 
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
