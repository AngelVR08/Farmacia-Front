import React from 'react';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const ProductDetail = ({ product }) => {
  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <Text>{product.description}</Text>
      <Text>{`$${product.price}`}</Text>
      <Text>{product.note}</Text>
      <div className="quantity">
        <label htmlFor="quantity">Cantidad a comprar:</label>
        <select id="quantity">
          <option value="1">1pz</option>
          <option value="2">2pz</option>
          <option value="3">3pz</option>
        </select>
      </div>
      <div className="actions">
        <Button>Agregar al carrito</Button>
        <Button>Comprar</Button>
      </div>
      <Text>¡Calidad para tu bienestar!</Text>
    </div>
  );
};

export default ProductDetail;
