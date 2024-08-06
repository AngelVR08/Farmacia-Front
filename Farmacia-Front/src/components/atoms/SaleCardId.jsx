import React from 'react';

const SaleCard = ({ saleId, date, clientId, employeeId, totalPrice, updatedAt }) => (
  <div className="sale-card">
    <h2>Venta ID: {saleId}</h2>
    <p>Cliente ID: {clientId}</p>
    <p>Empleado ID: {employeeId}</p>
    <p>Fecha de Creación: {new Date(date).toLocaleDateString()}</p>
    <p>Última Actualización: {new Date(updatedAt).toLocaleDateString()}</p>
    <p>Total: ${totalPrice}</p>
  </div>
);

export default SaleCard;
