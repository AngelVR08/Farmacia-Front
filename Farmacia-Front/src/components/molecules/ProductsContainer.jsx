// ProductsContainer.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductsContainer.css';

const ProductsContainer = () => {


  return (
    <div className="products-container">
      {products.map(product => (
        <ProductCard
          key={product.id}
          image={product.url}
          name={product.name}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductsContainer;
