import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 

const url = import.meta.env.VITE_URL_API;
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, settoken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
     settoken(localStorage.getItem('token'));
    const myHeaders = new Headers();
    //myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${url}product/client`, requestOptions)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            alert('Unauthorized: Please check your token'); // Mostrar alerta
            navigate('/login'); // Redirigir al login
            return;
          }
          throw new Error('An error occurred while fetching data');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setError('Data is not in expected format');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]); // Incluir navigate en las dependencias

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Productos</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            {token != null?(<Link to={`/product/${product.id}`}>Ver detalles</Link>):null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
