import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" className="search-input" placeholder="Buscar" />
      <button className="search-button">Buscar</button>
    </div>
  );
};

export default SearchBar;
