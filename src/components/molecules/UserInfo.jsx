import React, { useEffect, useState } from "react";
import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import Paragraph from "../atoms/Paragraph";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_URL_API;

const UserInfo = ({ user }) => {
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUser] = useState(null);
  const [historial, setHistorial] = useState({});
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState({
    full_name: user.full_name,
    email: "",
    password: "",
    updated_by: user.full_name,
  });

  const hasOrders = user.orders && user.orders.length > 0;

  const groupByCartId = (items) => {
    return items.reduce((acc, item) => {
      const { cart_id, cart_price } = item;
      if (!acc[cart_id]) {
        acc[cart_id] = {
          items: [],
          totalCartPrice: 0,
        };
      }
      acc[cart_id].items.push(item);
      acc[cart_id].totalCartPrice += parseFloat(cart_price);
      return acc;
    }, {});
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado. Redirigiendo al inicio de sesión.");
      navigate("/login");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${url}client/${user.cliente_id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setUser(data);
        setEmail(data.email);
        setEditedUser(prevState => ({ ...prevState, email: data.email, full_name: data.full_name }));
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });

    fetch(`${url}cartItem/historial/${user.cliente_id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(groupByCartId(data));
        setHistorial(groupByCartId(data));
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }, [user.cliente_id, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSaveClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado. Redirigiendo al inicio de sesión.");
      navigate("/login");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(editedUser),
      redirect: "follow",
    };
    await fetch(`${url}client/edit/${user.cliente_id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized: Please check your token");
            navigate("/login");
            return;
          }
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(result => {
        alert("Datos modificados");
        navigate(0);
        setIsEditing(false);
      })
      .catch(error => {
        alert("Error: " + error.message);
        console.error(error);
      });
  };

  if (!users) {
    return (
      <p>Cargando...</p>
    );
  }

  return (
    <div className="user-info card">
      <Title>Resumen de Mi cuenta</Title>
      <Subtitle>¡Hola!, {users.full_name}</Subtitle>
      {isEditing ? (
        <div className="edit-form">
          <div className="form-group">
            <label htmlFor="full_name">Nombre completo:</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={editedUser.full_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-buttons">
            <button onClick={handleSaveClick}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <Paragraph>Correo vinculado: {email}</Paragraph>
          <Paragraph>Contraseña: ********</Paragraph>
          <button onClick={handleEditClick}>Editar datos</button>
          <Paragraph>
            Historial de pedidos:
            {Object.keys(historial).length > 0 ? (
              Object.keys(historial).map(cartId => (
                <div key={cartId} className="cart-group">
                  <h3>Carrito ID: {cartId}</h3>
                  {historial[cartId].items.map(item => (
                    <div key={item.product_id} className="cart-item">
                      <img src={item.url} alt={item.name} />
                      <p>Producto: {item.name}</p>
                      <p>Precio: ${item.price}</p>
                      <p>Cantidad: {item.quantity}</p>
                      <p>Precio Total: ${item.cart_price}</p>
                    </div>
                  ))}
                  <h4>Precio Total del Carrito: ${historial[cartId].totalCartPrice.toFixed(2)}</h4>
                </div>
              ))
            ) : (
              <p>No tienes pedidos.</p>
            )}
          </Paragraph>
          
        </>
      )}
    </div>
  );
};

export default UserInfo;
