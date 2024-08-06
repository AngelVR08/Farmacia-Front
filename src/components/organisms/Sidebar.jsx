import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [rol, setRol] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const userRole = localStorage.getItem("rol");
    console.log("Rol desde localStorage:", userRole);
    setRol(userRole);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Inventario</h3>
        <ul>
          <li>
            <Link to="/admin/add-product">Agregar Producto</Link>
          </li>
          <li>
            <Link to="/admin/delete-product">Eliminar Producto</Link>
          </li>
          <li>
            <Link to="/admin/edit-product">Editar Producto</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
        <h3>Ventas</h3>
        <ul>
          <li>
            <Link to="/admin/view-all-sales">Historial de Ventas</Link>
          </li>
          <li>
            <Link to="/admin/view-individual-sale">Ventas Individuales</Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-section">
          <h3>Vouchers</h3>
          <ul>
            <li>
              <Link to="/admin/voucher">Ver Todos</Link>
            </li>
            <li>
              <Link to="/admin/voucherLiberar">Aprobar Voucher</Link>
            </li>
          </ul>
        </div>
      {rol === "admin" && (
        <div className="sidebar-section">
          <h3>Empleados</h3>
          <ul>
            <li>
              <Link to="/admin/add-employee">Agregar Empleado</Link>
            </li>
            <li>
              <Link to="/admin/delete-employee">Eliminar Empleado</Link>
            </li>
            <li>
              <Link to="/admin/edit-employee">Editar Empleado</Link>
            </li>
          </ul>
        </div>
      )}
      <div className="sidebar-section">
        <h3>Navegación</h3>
        <ul>
          <li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </li>
          <li>
            <Link to="/">Página Principal</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
