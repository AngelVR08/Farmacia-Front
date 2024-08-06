import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBox,
  faShoppingCart,
  faInfoCircle,
  faUser,
  faRightToBracket,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../molecules/SearchBar";

const MainHeader = () => {
  const [token, settoken] = useState(null);
  useEffect(() => {
    settoken(localStorage.getItem("token"));
  }, []);
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/home" style={{textDecoration:"none"}}>
          <h1>Farmacia Cristopher</h1>
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/home">
          <FontAwesomeIcon icon={faHome} /> Inicio
        </Link>
        <Link to="/products">
          <FontAwesomeIcon icon={faBox} /> Productos
        </Link>
        {token !== null ? (
          <>
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Carrito
            </Link>
            <Link to="/user">
              <FontAwesomeIcon icon={faUser} /> Cuenta
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <FontAwesomeIcon icon={faAddressCard} />
              Regístrate
            </Link>
            <Link to="/login">
              <FontAwesomeIcon icon={faRightToBracket} />
              Iniciar sesión
            </Link>
          </>
        )}
        <Link to="/about">
          <FontAwesomeIcon icon={faInfoCircle} /> Nosotros
        </Link>
      </nav>
    </header>
  );
};

export default MainHeader;
