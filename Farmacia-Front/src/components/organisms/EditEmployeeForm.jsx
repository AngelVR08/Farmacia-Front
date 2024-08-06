import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const url = import.meta.env.VITE_URL_API;

const EditEmployeeForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [createdBy, setCreatedBy] = useState("Master");
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const findEmployee = async (e) => {
    e.preventDefault();
    setError(null);

    if (!employeeId) {
      setError("Por favor, ingrese el ID del empleado.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Error: Usuario no autenticado");
      navigate("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${url}employee/${employeeId}`, requestOptions);
      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized: Please check your token");
          navigate("/login");
          return;
        }
        throw new Error(await response.text());
      }
      const result = await response.json();
      setEmployee(result);
      setFullName(result.full_name);
      setSalary(result.salary);
      setPosition(result.position);
    } catch (error) {
      setError("Empleado no encontrado");
      setEmployee(null)
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!employeeId) {
      alert("Por favor, ingrese el ID del empleado.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Error: Usuario no autenticado");
      navigate("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      full_name: fullName,
      password: password,
      salary: parseFloat(salary),
      position: position,
      created_by: createdBy,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${url}employee/edit/${employeeId}`, requestOptions);
      if (!response.ok) {
        if (response.status === 401) {
          alert("Unauthorized: Please check your token");
          navigate("/login");
          return;
        }
        throw new Error(await response.text());
      }
      const result = await response.json();
      alert("Empleado actualizado con éxito");
      console.log(result);
    } catch (error) {
      alert("Error al actualizar el empleado: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="admin-form">
      <Title>Editar Empleado</Title>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <Label htmlFor="employeeId">ID del Empleado:</Label>
          <Input
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="ID del empleado"
          />
          <Button type="button" onClick={findEmployee}>
            Buscar Empleado
          </Button>
        </div>
        {employee && (
          <>
            <div className="form-row">
              <Label htmlFor="fullName">Nombre Completo:</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nombre completo"
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
              />
            </div>
            <div className="form-row">
              <Label htmlFor="salary">Salario:</Label>
              <Input
                id="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salario"
                type="number"
              />
            </div>
            <div className="form-row">
              <Label htmlFor="position">Posición:</Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Posición"
              />
            </div>
            <Button type="submit">Actualizar Empleado</Button>
          </>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default EditEmployeeForm;
