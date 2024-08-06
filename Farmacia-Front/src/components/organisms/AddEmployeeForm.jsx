import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const url = import.meta.env.VITE_URL_API;
const AddEmployeeForm = () => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [createdBy, setCreatedBy] = useState(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Error: Usuario no autenticado");
      navigate("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      full_name: fullName,
      password: password,
      email:email,
      salary: parseFloat(salary),
      position: position,
      created_by: createdBy,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}employee/create`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized: Please check your token");
            navigate("/login");
            return;
          }
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then((result) => {
        alert("Empleado agregado con éxito");
        console.log(result);
      })
      .catch((error) => {
        alert("Error al agregar el empleado: " + error.message);
        console.error(error);
      });
  };

  return (
    <div className="admin-form">
      <Title>Agregar Empleado</Title>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <Label htmlFor="fullName">Nombre Completo:</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nombre completo"
            required
          />
        </div>
        <div className="form-row">
          <Label htmlFor="password">Contraseña:</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="form-row">
          <Label htmlFor="email">Correo:</Label>
          <Input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
          />
        </div>
        <div className="form-row">
          <Label htmlFor="salary">Salario:</Label>
          <Input
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Salario"
            required
          />
        </div>
        <div className="form-row">
          <Label htmlFor="position">Posición:</Label>
          <Input
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Posición"
            required
          />
        </div>
        <Button type="submit">Agregar Empleado</Button>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
