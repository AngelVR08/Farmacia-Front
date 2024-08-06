import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

const url = import.meta.env.VITE_URL_API;

const DeleteProductForm = () => {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const findProduct = (e) => {
    e.preventDefault();
    if (!productId) {
      alert("Por favor, ingrese el ID del producto.");
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

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${url}product/${productId}`, requestOptions)
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
        console.log(result);
        setProduct(result);
      })
      .catch((error) => {
        alert("producto no encontrado");
        console.error(error);
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (!productId) {
      alert("Por favor, ingrese el ID del producto.");
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

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${url}product/${productId}`, requestOptions)
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
        return response.text();
      })
      .then((result) => {
        alert("Producto eliminado con éxito");
        console.log(result);
        setProduct(null);
        setProductId("");
      })
      .catch((error) => {
        alert("Error al eliminar el producto");
        console.error(error);
      });
  };

  return (
    <div className="admin-form" style={{ maxWidth: "600px", margin: "auto" }}>
      <Title>Eliminar Producto</Title>
      <form>
        <div className="form-row">
          <Label htmlFor="productId">ID del Producto:</Label>
          <Input
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="ID del producto"
          />
        </div>

        {product ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p>Producto encontrado</p>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src={product.url}
                alt={product.name}
                style={{ maxWidth: "150px", borderRadius: "8px" }}
              />
              <div style={{ textAlign: "left" }}>
                <p><strong>Nombre:</strong> {product.name}</p>
                <p><strong>Precio:</strong> ${product.price}</p>
                <p><strong>Descripción:</strong> {product.description}</p>
              </div>
            </div>
            <Button onClick={handleDelete} style={{ marginTop: "20px" }}>
              Eliminar Producto
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={findProduct}>
            Buscar Producto
          </Button>
        )}
      </form>
    </div>
  );
};

export default DeleteProductForm;
