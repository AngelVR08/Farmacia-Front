import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "../components/molecules/FeaturedProducts";
import HowToBuy from "../components/organisms/HowToBuy";

const url = import.meta.env.VITE_URL_API;
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${url}product/client`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Unauthorized: Please check your token");
            navigate("/login");
            return;
          }
          throw new Error("An error occurred while fetching data");
        }
        return response.json();
      })
      .then((result) => {
        setProducts(result.slice(0, 3));
      })
      .catch((error) => console.error(error));
  }, [navigate]);

  return (
    <div className="home-page">
      <h2>Productos destacados</h2>
      <FeaturedProducts products={products} />
      <div className="section-divider"></div>
      <HowToBuy />
    </div>
  );
};

export default HomePage;
