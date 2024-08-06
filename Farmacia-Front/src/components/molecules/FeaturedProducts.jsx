import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const url = import.meta.env.VITE_URL_API;

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //const token = localStorage.getItem("token");
        const myHeaders = new Headers();
        //myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const response = await fetch(`${url}cartItem/imgs`, requestOptions);
        if (!response.ok) {
          throw new Error("Error fetching products");
        }
        const data = await response.json();

        if (data.length === 0) {
          throw new Error("No products found");
        }

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message || "An error occurred while fetching products.");
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="featured-products-container">
      {error ? (
        <p>{error}</p>
      ) : (
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="featured-product-card">
              <img src={product.url} alt={product.name} />
              <h3>{product.name}</h3>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FeaturedProducts;
