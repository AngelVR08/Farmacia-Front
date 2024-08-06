import React, { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import ShoppingCart from "../components/molecules/ShoppingCart";
import PurchaseSummary from "../components/molecules/PurchaseSummary";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import VoucherTemplate from "./VoucherTemplate";
import html2canvas from "html2canvas";
import "../assets/BaucherStyle.css";

const url = import.meta.env.VITE_URL_API;

const ShoppingCartPage = () => {
  const [cartId, setCartId] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [piezas, setPiezas] = useState(0);
  const [idcliente, setIdcliente] = useState(0);
  const [idvoucher, setId] = useState(0);
  const navigate = useNavigate();

  const handleGenerateVoucher = async (id) => {
    console.log(idvoucher);

    const voucherHtml = ReactDOMServer.renderToString(
      <VoucherTemplate
        items={cartItems}
        total={total}
        piezas={piezas}
        id={id}
      />
    );
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = voucherHtml;
    document.body.appendChild(tempDiv);

    try {
      const canvas = await html2canvas(tempDiv);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("comprobante_compra.pdf");
    } finally {
      document.body.removeChild(tempDiv);
    }
  };

  const getProducts = async (cartId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado. Redirigiendo al inicio de sesión.");
      navigate("/login");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    try {
      const response = await fetch(`${url}cartItem/${cartId}`, {
        method: "GET",
        headers: myHeaders,
      });
      if (!response.ok) {
        throw new Error("Error fetching products");
      }
      const data = await response.json();
      setCartItems(data);
      console.log(data);

      const totalAmount = data.reduce(
        (acc, item) => acc + (parseFloat(item.price) || 0),
        0
      );
      const totalPiezas = data.reduce(
        (acc, item) => acc + (parseInt(item.quantity) || 0),
        0
      );
      setTotal(totalAmount);
      setPiezas(totalPiezas);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const updateCart = async () => {
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
      status: "En proceso",
      total_price: total,
    });
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");
    myHeaders2.append("Authorization", `Bearer ${token}`);
    const raw2 = JSON.stringify({
      client_id: idcliente,
      employee_id: 14,
      total_price: total,
    });
    const requestOptions2 = {
      method: "POST",
      headers: myHeaders2,
      body: raw2,
      redirect: "follow",
    };
    await fetch(`${url}cart/procces/${cartId}`, requestOptions)
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
        alert("Compra en proceso");
        console.log(1);

        console.log(result);
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
      });
    await fetch(`${url}sale/`, requestOptions2)
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
        console.log(2);
        console.log(result);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);
        const raw = JSON.stringify({
          sale_id: result.id,
          product_id: cartId,
          quantity: total,
          staus: "pendiente",
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        fetch(`${url}voucher/`, requestOptions)
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
          .then(async (result) => {
            console.log(result);
            console.log(3);
            setId(result.id);
            await handleGenerateVoucher(result.id);
           navigate(0);
          })
          .catch((error) => {
            alert("Error: " + error.message);
            console.error(error);
          });
      })
      .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado. Redirigiendo al inicio de sesión.");
      navigate("/login");
      return;
    }
    const decodedToken = jwtDecode(token);
    setIdcliente(decodedToken.cliente_id);
    const clienteId = decodedToken.cliente_id;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    fetch(`${url}cart/`, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => {
        const existingCart = data.find(
          (cart) => cart.cliente_id === clienteId && cart.status === "Pendiente"
        );
        if (existingCart) {
          setCartId(existingCart.id);
          getProducts(existingCart.id);
        }
      })
      .catch((error) => console.error("Error checking cart:", error));
  }, [navigate]);

  return (
    <div className="shopping-cart-page">
      <div id="voucher-content">
        {cartItems.length > 0 ? (
          <>
            <ShoppingCart items={cartItems} />
            <PurchaseSummary
              products={piezas}
              total={total}
              onGenerateVoucher={updateCart}
            />
          </>
        ) : (
          <p>Sin carrito</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
