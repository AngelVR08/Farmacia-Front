import "../../assets/Voucher.css";
import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const url = import.meta.env.VITE_URL_API;

const ModificarVoucher = () => {
  const [voucherId, setVoucherId] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const findVoucher = async (e) => {
    e.preventDefault();
    setError(null);

    if (!voucherId) {
      setError("Por favor, ingrese el ID del voucher.");
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
        `${url}voucher/${voucherId}`,
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
      setVoucher(result);
      console.log(result);
    } catch (error) {
      setError("Voucher no encontrado");
      console.error(error);
    }
  };

  const putVoucher = async (e) => {
    e.preventDefault();
    console.log(voucher[0].voucher_id);

    if (!voucherId) {
      setError("Por favor, ingrese el ID del voucher.");
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
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify({ status: "Pagado" }),
    };

    try {
      const response = await fetch(
        `${url}voucher/${voucherId}`,
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
      alert("Vaoucher pagado");
      cart()
      console.log(result);
    } catch (error) {
      setError("Voucher no encontrado");
      console.error(error);
    }
  };
 const cart = async () =>{
    console.log(voucher[0].id_cart);
    if (!voucherId) {
        setError("Por favor, ingrese el ID del voucher.");
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
      myHeaders.append("Content-Type", "application/json");
  
      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({ status: "Pagado" }),
      };
  
      try {
        const response = await fetch(
          `${url}cart/admin/status/${voucher[0].id_cart}`,
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
        cart()
        console.log(result);
      } catch (error) {
        setError("Voucher no encontrado");
        console.error(error);
      }
 }

  return (
    <div className="admin-form">
      <Title>Buscar Voucher</Title>
      <form>
        <div className="form-row">
          <Label htmlFor="voucherId">Folio del voucher:</Label>
          <Input
            id="voucherId"
            value={voucherId}
            onChange={(e) => setVoucherId(e.target.value)}
            placeholder="Folio del voucher"
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        {voucher ? (
          <div className="voucher-details">
            <h2>Detalles del Voucher</h2>
            {voucher.map((item, index) => (
              <div key={index} className="voucher-item">
                <div>
                  <p>
                    <strong>Producto:</strong> {item.product_name}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {item.quantity}
                  </p>
                  <p>
                    <strong>Precio:</strong> ${item.price}
                  </p>
                  <p>
                    <strong>Precio Total:</strong> ${item.total_price}
                  </p>
                </div>
                <img src={item.url} alt={item.product_name} />
              </div>
            ))}
            <Button onClick={putVoucher}>Liberar Voucher</Button>
          </div>
        ) : (
          <Button onClick={findVoucher}>Buscar Voucher</Button>
        )}
      </form>
    </div>
  );
};

export default ModificarVoucher;
