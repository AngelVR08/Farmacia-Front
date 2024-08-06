import React from 'react';
import Title from '../atoms/Title';
import Text from '../atoms/Text';
import Button from '../atoms/Button';
import '../../assets/BaucherStyle.css';

const PurchaseSummary = ({ products, total, onGenerateVoucher }) => {

  return (
    <div className="purchase-summary">
      <Title text="Resumen de compra" />
      <Text>Productos: {products} Pz</Text>
      <Text>Total: ${total.toFixed(2)}</Text>
      <button className="generate-voucher-button" onClick={onGenerateVoucher}>Generar voucher de pago</button>
    </div>
  );
};

export default PurchaseSummary;
