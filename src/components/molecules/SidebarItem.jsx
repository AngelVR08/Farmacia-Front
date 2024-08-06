// src/components/molecules/SidebarItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ to, text }) => {
  return (
    <li className="sidebar-item">
      <Link to={to}>{text}</Link>
    </li>
  );
};

export default SidebarItem;
