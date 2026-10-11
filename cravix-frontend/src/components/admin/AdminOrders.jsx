import { useEffect, useState } from "react";

import OrdersTable from "./OrdersTable";

import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("cravix-token");

      console.log("========== ADMIN ORDERS ==========");
      console.log("Token exists:", !!token);
      console.log("=================================");

      if (!token) {
        console.error("No cravix-token found");
        setOrders([]);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders status:", response.status);

      const data = await response.json();

      console.log("Orders response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load orders"
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("Failed to load orders:", error);

      alert(
        error.message || "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-orders">

      <div className="admin-orders-header">
  <div>
    <h1>Orders</h1>
    <p>Manage customer orders</p>
  </div>

  <div className="admin-orders-count">
    <strong>{orders.length}</strong>
    <span>Total Orders</span>
  </div>
</div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <OrdersTable
          orders={orders}
          refreshOrders={fetchOrders}
        />
      )}

    </div>
  );
}

export default AdminOrders;