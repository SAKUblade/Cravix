import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantDetails from "../pages/RestaurantDetails";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Restaurant from "../pages/Restaurant";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Orders from "../pages/my-Orders";
import Profile from "../pages/Profile";
import Dashboard from "../pages/admin/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route
  path="/restaurants/:id"
  element={<RestaurantDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;