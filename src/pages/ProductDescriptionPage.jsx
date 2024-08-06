import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Title from "../components/atoms/Title";
import Subtitle from "../components/atoms/Subtitle";
import Text from "../components/atoms/Text";
import Button from "../components/atoms/Button";
import Paragraph from "../components/atoms/Paragraph";

const url = import.meta.env.VITE_URL_API;
const ProductDescriptionPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado. Redirigiendo al inicio de sesión.");
      navigate("/login");
      return;
    }

    let clienteId;
    try {
      const decodedToken = jwtDecode(token);
      clienteId = decodedToken.cliente_id;
      console.log("ID del cliente obtenido del token:", clienteId);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      navigate("/login");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${url}cart/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Carros obtenidos:", data);
        const existingCart = data.find(
          (cart) =>
            cart.cliente_id === clienteId &&
            cart.status == "Pendiente" &&
            cart.deleted == 0
        );
        if (existingCart) {
          setCartId(existingCart.id);
          console.log("Carrito existente encontrado:", existingCart.id);
        }
      })
      .catch((error) => console.error("Error checking cart:", error));

    // Obtener detalles del producto
    fetch(`${url}product/client/${id}`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized: Please check your token");
            navigate("/login");
            return;
          }
          throw new Error("An error occurred while fetching the product data");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    if (!cartId) {
      let clienteId;
      try {
        const decodedToken = jwtDecode(token);
        clienteId = decodedToken.cliente_id;
        console.log(decodedToken);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        navigate("/login");
        return;
      }

      const rawCart = JSON.stringify({
        cliente_id: clienteId,
        total_price: 0,
        status: "Pendiente",
      });

      console.log("Creando carrito con datos:", rawCart);

      fetch(`${url}cart`, {
        method: "POST",
        headers: myHeaders,
        body: rawCart,
        redirect: "follow",
      })
        .then(async (response) => await response.json())
        .then((newCart) => {
          console.log("Nuevo carrito creado:", newCart);
          if (!newCart.id) {
            console.error(
              "ID del carrito no encontrado en la respuesta:",
              newCart
            );
            throw new Error("No se obtuvo el ID del nuevo carrito");
          }
          setCartId(newCart.id);
          verifyCartAssociation(clienteId, newCart.id);
        })
        .catch((error) => {
          console.error("Error creating cart:", error);
          alert("Error al crear el carrito: " + error.message);
        });
    } else {
      addItemToCart(cartId);
    }
  };

  const verifyCartAssociation = (clienteId, createdCartId) => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${url}cart/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Verificación de carros después de crear:", data);
        const verifiedCart = data.find(
          (cart) => cart.cliente_id === clienteId && cart.id === createdCartId
        );
        if (verifiedCart) {
          console.log("Carrito verificado:", verifiedCart.id);
          addItemToCart(verifiedCart.id);
        } else {
          console.error("Carrito no encontrado o no asociado correctamente.");
          alert("Error al verificar el carrito.");
        }
      })
      .catch((error) => console.error("Error verifying cart:", error));
  };

  const addItemToCart = (cartId) => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    console.log("Añadiendo producto al carrito:", cartId);

    const rawItem = JSON.stringify({
      cart_id: cartId,
      product_id: product.id,
      quantity: quantity,
      price: parseFloat(product.price * quantity),
    });

    fetch(`${url}cartItem/`, {
      method: "POST",
      headers: myHeaders,
      body: rawItem,
      redirect: "follow",
    })
      .then(async (response) => {
        if (!response.ok) {
          return await response.json().then((text) => {
            throw new Error(text.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        alert("Producto agregado al carrito");
        console.log(data);
      })
      .catch((error) => {
        alert("Error al agregar el producto al carrito: " + error.message);
        console.error(error);
      });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <div className="product-description-page">
      {product ? (
        <>
          <div className="product-detail">
            <div className="product-image-container">
              <img
                src={product.url}
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-details-content">
              <Title>{product.name}</Title>
              <Text>
                <strong>Descripción:</strong> {product.description}
              </Text>
              <Text>
                <strong>Precio:</strong> ${product.price*quantity}
              </Text>
              <Text>
                <strong>Fórmula:</strong> {product.formula}
              </Text>
              <Text>
                <strong>Efectos Secundarios:</strong>{" "}
                {product.secundary_effects}
              </Text>
              <Text>
                <strong>Caducidad:</strong>{" "}
                {new Date(product.caducity).toLocaleDateString()}
              </Text>
              <Text>
                <strong>Dosis:</strong> {product.dose}
              </Text>
              <Text>
                <strong>Clasificación:</strong> {product.type}
              </Text>
              <Text>
                <strong>Uso:</strong> {product.uso}
              </Text>
              <Text>
                <strong>Stock:</strong> {product.stock}
              </Text>
              <div className="actions">
                <label>
                  Cantidad:
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max={product.stock}
                  />
                </label>
                <Button onClick={handleAddToCart}>Agregar al Carrito</Button>
                <Button onClick={() => navigate("/products")}>
                  Volver a Productos
                </Button>
              </div>
            </div>
          </div>
          <div className="product-info">
            <Subtitle>Descripción del producto</Subtitle>
            <Paragraph>Detalles adicionales del producto.</Paragraph>
            <Subtitle>Instrucciones</Subtitle>
            <Paragraph>Instrucciones del producto.</Paragraph>
            <Subtitle>Advertencias</Subtitle>
            <Paragraph>Advertencias del producto.</Paragraph>
          </div>
        </>
      ) : (
        <Text>Producto no encontrado</Text>
      )}
    </div>
  );
};

export default ProductDescriptionPage;
