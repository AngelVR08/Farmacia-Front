import React from 'react';
import '../assets/VoucherTemplate.css';

const VoucherTemplate = ({ items, total, piezas,id }) => {
  const date = new Date().toLocaleString();
  
  return (
    <div className="voucher-template">
      <h1>Farmacia Cristopher</h1>
      <p className="date">Fecha: {date}</p>
       <p className="date">Folio: {id}</p>
      <h2>Comprobante de Compra</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const price = Number(item.price)/Number(item.quantity);
            const quantity = Number(item.quantity);
            const subtotal = Number(item.price);
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{quantity}</td>
                <td>${isNaN(price) ? '0.00' : price.toFixed(2)}</td>
                <td>${isNaN(subtotal) ? '0.00' : subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="summary">
        <p>Total de productos: {piezas}</p>
        <p className="total">Total a pagar: ${typeof total === 'number' ? total.toFixed(2) : '0.00'}</p>
      </div>
      <p className="footer">Gracias por su compra</p>
    </div>
  );
};

export default VoucherTemplate;