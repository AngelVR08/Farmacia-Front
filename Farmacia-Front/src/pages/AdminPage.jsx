import React from 'react';
import AdminNavbar from '../components/organisms/AdminNavbar';
import Sidebar from '../components/organisms/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-main">
        <Sidebar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
