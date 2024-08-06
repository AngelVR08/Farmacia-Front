import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const url = import.meta.env.VITE_URL_API;
const DeleteEmployeeForm = () => {
  const [employeeId, setEmployeeId] = useState("");
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
      const response = await fetch(
        `${url}employee/${employeeId}`,
        requestOptions
      );
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
      console.log(result);
    } catch (error) {
      setError("Empleado no encontrado");
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
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
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${url}employee/delete/${employeeId}`,
        requestOptions
      );
      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized: Please check your token");
          navigate("/login");
          return;
        }
        throw new Error(await response.text());
      }
      const result = await response.text();
      alert("Empleado eliminado con éxito");
      console.log(result);
      setEmployee(null);
      setEmployeeId("");
    } catch (error) {
      setError("Error al eliminar el empleado: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="admin-form">
      <Title>Eliminar Empleado</Title>
      <form>
        <div className="form-row">
          <Label htmlFor="employeeId">ID del Empleado:</Label>
          <Input
            id="employeeId"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="ID del empleado"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        {employee ? (
          <div className="employee-details">
            <p>
              <strong>Empleado:</strong> {employee.full_name}
            </p>
            <p>
              <strong>Correo:</strong> {employee.email}
            </p>
            <p>
              <strong>Puesto:</strong> {employee.position}
            </p>
            <p>
              <strong>Salario:</strong> ${employee.salary}
            </p>
            <Button onClick={handleDelete}>Eliminar Empleado</Button>
          </div>
        ) : (
          <Button onClick={findEmployee}>Buscar Empleado</Button>
        )}
      </form>
    </div>
  );
};

export default DeleteEmployeeForm;
