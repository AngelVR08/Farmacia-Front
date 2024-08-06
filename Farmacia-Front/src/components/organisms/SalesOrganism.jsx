import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SaleCard from '../atoms/SaleCard'; 

const url = import.meta.env.VITE_URL_API;
const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${url}sale/`, requestOptions)
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            alert('Unauthorized: Please check your token');
            navigate('/login');
            return;
          }
          throw new Error('An error occurred while fetching data');
        }
        return response.json();
      })
      .then(data => {
        setSales(data);
        console.log(data);
        
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Ventas</h1>
      <div className="sales-grid">
        {sales.map(sale => (
          <SaleCard 
            key={sale.sale_id}
            saleId={sale.sale_id} 
            date={sale.created_at} 
            clientId={sale.client_id}
            nameClient={sale.client_name} 
            employeeId={sale.employee_id}
            nameEmployee={sale.employee_name}
            totalPrice={sale.total_price} 
          />
        ))}
      </div>
    </div>
  );
};

export default SalesPage;
