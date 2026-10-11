import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import TrackOrder from "./pages/TrackOrder";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminMenu from "./components/admin/AdminMenu";

import AdminOrders from "./components/admin/AdminOrders";
import AdminRestaurants from "./components/admin/AdminRestaurants";

import ProtectedRoute from "./components/auth/ProtectedRoute";

import FloatingCart from "./components/cart/FloatingCart";
import SplashScreen from "./components/common/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}

        <Route path="/" element={<Home />} />

        <Route
          path="/restaurants/:id"
          element={<RestaurantDetails />}
        />

        <Route
  path="/admin/restaurants"
  element={
    <ProtectedRoute adminOnly>
      <AdminRestaurants />
    </ProtectedRoute>
  }
/>

        {/* Authentication */}

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Cart */}

        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        {/* Order Success */}

        <Route
          path="/order-success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        {/* My Orders */}

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* Track Order */}

        <Route
          path="/track-order/:id"
          element={
            <ProtectedRoute>
              <TrackOrder />
            </ProtectedRoute>
          }
        />

        {/* Order Details */}

        <Route
          path="/order-details/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* Admin */}

<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedRoute adminOnly>
      <AdminOrders />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/restaurants"
  element={
    <ProtectedRoute adminOnly>
      <AdminRestaurants />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/menu"
  element={
    <ProtectedRoute adminOnly>
      <AdminMenu />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/orders"
  element={
    <ProtectedRoute adminOnly>
      <AdminOrders />
    </ProtectedRoute>
  }
/>
      </Routes>

      <FloatingCart />
    </BrowserRouter>
  );
}

export default App;