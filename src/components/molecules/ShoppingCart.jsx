import React, { useState } from "react";
import Title from "../atoms/Title";
import Text from "../atoms/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/ShoppingCart.css";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_URL_API;
const ShoppingCart = ({ items, onDeleteItem }) => {
  const navigate = useNavigate();

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Error: Usuario no autenticado");
      navigate("/login");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };
    const result = await fetch(`${url}cartItem/${id}`, requestOptions)
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
      .then((response) => {
        alert("Producto eliminado del carrito");
        navigate(0);
        console.log(response);
      })
      .catch((error) => {
        alert("Producto no encontrado");
        console.error(error);
      });
  };
  return (
    <div className="shopping-cart">
      <Title text="Carrito de compras" />
      {items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.url} alt={item.name} className="item-image" />
            <div className="item-details">
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
              <Text>{item.quantity} Pz</Text>
            </div>
            <FontAwesomeIcon
              icon={faTrash}
              className="delete-icon"
              onClick={() => deleteItem(item.id)}
            />
          </div>
        ))
      ) : (
        <Text>No hay productos en el carrito</Text>
      )}
    </div>
  );
};

export default ShoppingCart;
