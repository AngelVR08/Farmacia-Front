import React from 'react';

const VoucherCar = ({ saleId, date, clientId, employeeId, totalPrice,nameEmployee, nameClient }) => (
  <div className="sale-card">
    <h2>Voucher ID: {saleId}</h2>
    <p>Carrito ID: {clientId}</p>
    <p>Venta ID: {employeeId}</p>
    <p>Fecha: {new Date(date).toLocaleDateString()}</p>
    <p>Estatus: {nameClient}</p>
    <p>Total: ${totalPrice}</p>
  </div>
);

export default VoucherCar;
