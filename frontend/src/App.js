import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
} from "./Routes";
import ProtectedRoute from "./ProtectedRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";
const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <>
      {/* {loading ? null : ( */}
      <BrowserRouter>
        <Routes>
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
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoute>
            }
          /><Route
            path="/shop-create"
            element={
                <ShopCreatePage />
            }
          />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          /> <Route
            path="seller/activation/:activation_token"
            element={<SellerActivationPage />}
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
      {/* )} */}
    </>
  );
};

export default App;
