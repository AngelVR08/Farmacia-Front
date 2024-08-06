import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SaleCard from "../atoms/SaleCard";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const url = import.meta.env.VITE_URL_API;
const SaleDetailPage = () => {
  const [saleId, setSaleId] = useState("");
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!saleId) {
      alert("Por favor, ingrese un ID de venta.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Error: Usuario no autenticado");
      navigate("/login");
      return;
    }

    setLoading(true);
    setError(null);
    setSale(null);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${url}sale/${saleId}`, {
      method: "GET",
      headers: myHeaders,
    })
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
      .then((data) => {
        setSale(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Venta no encontrada");
        console.log(error.message);

        setLoading(false);
      });
  };

  return (
    <div className="admin-form" id="one">
      <Title>Buscar Detalles de la Venta</Title>
      <form onSubmit={handleSearch}>
        <div className="form-row">
          <Label htmlFor="saleId">ID de la Venta:</Label>
          <Input
            id="saleId"
            value={saleId}
            onChange={(e) => setSaleId(e.target.value)}
            placeholder="Ingrese el ID de la venta"
          />
        </div>
        <Button type="submit">Buscar</Button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {sale && (
        <SaleCard
        key={sale.sale_id}
          saleId={sale.sale_id}
          date={sale.created_at}
          clientId={sale.client_id}
          nameClient={sale.client_name}
          employeeId={sale.employee_id}
          nameEmployee={sale.employee_name}
          totalPrice={sale.total_price}
          updatedAt={sale.updated_at}
        />
      )}
    </div>
  );
};

export default SaleDetailPage;
