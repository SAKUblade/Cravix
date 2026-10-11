import { useState } from "react";
import axios from "axios";

import { useAuth } from "../../context/useAuth";

import OrderStatusBadge from "./OrderStatusBadge";

import "./OrdersTable.css";

function OrdersTable({ orders, refreshOrders }) {
  const { token } = useAuth();

  const statusOptions = [
    "pending",
    "accepted",
    "preparing",
    "ready",
    "out for delivery",
    "delivered",
    "cancelled",
  ];

  const [updatingId, setUpdatingId] = useState(null);

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingId(orderId);

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      refreshOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="orders-table-wrapper">
      <table className="orders-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Restaurant</th>
            <th>Order Type</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>#{order.id}</td>

              <td>{order.restaurant_name}</td>

              <td>{order.order_type}</td>

              <td>₹{order.total_amount}</td>

              <td>
                <OrderStatusBadge
                  status={order.status}
                />
              </td>

              <td>
                {new Date(order.created_at)
                  .toLocaleDateString()}
              </td>

              <td>

                <select
                  disabled={updatingId === order.id}
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >

                  {statusOptions.map((status) => (

                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>

                  ))}

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

export default OrdersTable;