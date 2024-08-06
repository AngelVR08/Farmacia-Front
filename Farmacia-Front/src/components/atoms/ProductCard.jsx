// ProductCard.jsx
import React from 'react';

const ProductCard = ({ image, name, price, description }) => (
  <div className="product-card">
    <img src={image} alt={name} className="product-image" />
    <h2 className="product-title">{name}</h2>
    <p className="product-price">${price}</p>
    <p className="product-description">{description}</p>
    <button className="buy-button">Comprar</button>
  </div>
);

export default ProductCard;
