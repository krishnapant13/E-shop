import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  SellerActivationPage,
  HomePage,
  BestSelling,
  Products,
  FAQ,
  Events,
  ProductsDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage
} from "./routes/Routes";
import {ShopDashboardPage} from "./routes/ShopRoutes"
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { ShopHomePage } from "./routes/ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {/* user routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:name" element={<ProductsDetailsPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="activation/:activation_token"
          element={<ActivationPage />}
        />{" "}
        <Route
          path="/seller/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        {/* shop routes */}
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
