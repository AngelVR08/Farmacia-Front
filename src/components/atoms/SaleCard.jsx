import React from 'react';

const SaleCard = ({ saleId, date, clientId, employeeId, totalPrice,nameEmployee, nameClient }) => (
  <div className="sale-card">
    <h2>Venta ID: {saleId}</h2>
    <p>Cliente ID: {clientId}</p>
    <p>Nombre del cliente: {nameClient}</p>
    <p>Empleado ID: {employeeId}</p>
    <p>Nombre del empleado: {nameEmployee}</p>
    <p>Fecha: {new Date(date).toLocaleDateString()}</p>
    <p>Total: ${totalPrice}</p>
  </div>
);

export default SaleCard;
