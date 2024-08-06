import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import LoginPage from "./pages/LoginPage";
import Voucher from "./components/organisms/Voucher";
import LoginAdminPage from "./pages/LoginAdminPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterAdminPage from "./pages/RegisterAdminPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import AboutPage from "./pages/AboutPage";
import AddProductForm from "./components/organisms/AddProductForm";
import DeleteProductForm from "./components/organisms/DeleteProductForm";
import EditProductForm from "./components/organisms/EditProductForm";
import AddEmployeeForm from "./components/organisms/AddEmployeeForm";
import DeleteEmployeeForm from "./components/organisms/DeleteEmployeeForm";
import EditEmployeeForm from "./components/organisms/EditEmployeeForm";
import SalesViewAll from "./components/organisms/SalesOrganism";
import SalesViewindividual from "./components/organisms/SaleDetailOrganism";
import AuthHeader from "./components/organisms/AuthHeader";
import MainHeader from "./components/organisms/MainHeader";
import Footer from "./components/organisms/Footer";
import AdminNavbar from "./components/organisms/AdminNavbar";
import Sidebar from "./components/organisms/Sidebar";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import ProductPage from "./pages/ProductsPage";
import ModificarVoucher from "./components/organisms/ModificarVoucher";
import "./assets/base.css";
import "./assets/AdminNavbar.css";
import "./assets/header.css";
import "./assets/footer.css";
import "./assets/login.css";
import "./assets/home.css";
import "./assets/user.css";
import "./assets/admin.css";
import "./assets/AboutPage.css";
import "./assets/AboutUsContent.css";
import "./assets/InfoSection.css";
import "./assets/shoppingCartPage.css";
import "./assets/ProductDescriptionPage.css";
import "./assets/ProductsPage.css";
import "./assets/ProductCard.css";
import "./assets/SalesPage.css";

function AuthLayout({ children }) {
  return (
    <>
      <AuthHeader />
      <main>{children}</main>
    </>
  );
}

function MainLayout({ children }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AdminLayout({ children }) {
  return (
    <div className="admin-page">
      <AdminNavbar />
      <Sidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/home"
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />
      <Route
        path="/loginAdmin"
        element={
          <AuthLayout>
            <LoginAdminPage />
          </AuthLayout>
        }
      />
      <Route
        path="/registerAdmin"
        element={
          <AuthLayout>
            <RegisterAdminPage />
          </AuthLayout>
        }
      />

      <Route
        path="/admin/*"
        element={
          <AdminLayout>
            <Routes>
              <Route path="add-product" element={<AddProductForm />} />
              <Route path="delete-product" element={<DeleteProductForm />} />
              <Route path="edit-product" element={<EditProductForm />} />
              <Route path="add-employee" element={<AddEmployeeForm />} />
              <Route path="delete-employee" element={<DeleteEmployeeForm />} />
              <Route path="edit-employee" element={<EditEmployeeForm />} />
              <Route path="view-all-sales" element={<SalesViewAll />} />
              <Route path="voucher" element={<Voucher />} />
              <Route path="voucherLiberar" element={<ModificarVoucher />} />
              <Route
                path="view-individual-sale"
                element={<SalesViewindividual />}
              />
              <Route path="*" element={<AddProductForm />} />{" "}
              {/* Default route */}
            </Routes>
          </AdminLayout>
        }
      />
      <Route
        path="/products"
        element={
          <MainLayout>
            <ProductPage />
          </MainLayout>
        }
      />
      <Route
        path="/user"
        element={
          <MainLayout>
            <UserPage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
      <Route
        path="/cart"
        element={
          <MainLayout>
            <ShoppingCartPage />
          </MainLayout>
        }
      />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route
        path="/product/:id"
        element={
          <MainLayout>
            <ProductDescriptionPage />
          </MainLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);
