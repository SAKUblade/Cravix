import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Clock3,
  ChefHat,
  Bike,
  CheckCircle2,
  Package,
  Receipt,
  ArrowRight,
} from "lucide-react";

import API from "../services/api";

import "./MyOrders.css";

function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await API.get("/orders/my-orders");

      console.log("My Orders:", response.data);

      setOrders(response.data.orders || []);
    } catch (error) {
      console.error(
        "Failed to load orders:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const timeline = [
    {
      title: "Accepted",
      icon: Clock3,
    },
    {
      title: "Preparing",
      icon: ChefHat,
    },
    {
      title: "On The Way",
      icon: Bike,
    },
    {
      title: "Delivered",
      icon: CheckCircle2,
    },
  ];

  const getCurrentStep = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
      case "accepted":
        return 0;

      case "preparing":
        return 1;

      case "ready":
      case "out for delivery":
        return 2;

      case "delivered":
        return 3;

      default:
        return 0;
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <h1>My Orders</h1>
            <p>Track your delicious meals</p>
          </div>

          <div className="orders-list">
            <h2>Loading orders...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">

        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your delicious meals</p>
        </div>

        <div className="orders-list">

          {orders.length === 0 ? (
            <h2>No orders found.</h2>
          ) : (
            orders.map((order, index) => {

              const currentStep = getCurrentStep(
                order.status
              );

              const progressValues = [0, 33.33, 66.66, 100];
              const progress = progressValues[currentStep];

              return (

                <div
                  key={order.id}
                  className="order-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >

                  {/* =========================
                      TOP
                  ========================= */}

                  <div className="order-top">

                    <div>

                      <h2>
                        {order.restaurant_name}
                      </h2>

                      <p>
                        Order #{order.id}
                        <span> • </span>

                        {new Date(
                          order.created_at
                        ).toLocaleString()}
                      </p>

                    </div>

                    <span
                      className={`order-status ${
                        order.status === "delivered"
                          ? "delivered"
                          : "pending"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                  {/* =========================
                      ORDER ITEMS
                  ========================= */}

                  <div className="ordered-items">

                    {order.items?.map(
                      (item, itemIndex) => (
                        <p key={itemIndex}>
                          {item.quantity} × {item.item_name}
                        </p>
                      )
                    )}

                  </div>

                  {/* =========================
                      ORDER INFO
                  ========================= */}

                  <div className="order-middle">

                    <div className="order-info">

                      <Package size={18} />

                      <span>
                        {order.order_type}
                      </span>

                      <span>•</span>

                      <Receipt size={18} />

                      <span>
                        Cash on Delivery
                      </span>

                    </div>

                    <div className="order-price">

                      ₹
                      {Number(
                        order.total_amount
                      ).toFixed(2)}

                    </div>

                  </div>
                                    {/* =========================
                      TIMELINE
                  ========================= */}

                  <div className="timeline-wrapper">

                    {/* Background Progress Line */}

                    {/* Timeline Steps */}

                    <div className="timeline-steps">

                      {timeline.map((step, i) => {

                        const Icon = step.icon;

                        const completed = i < currentStep;

                        const current = i === currentStep;

                        const delivered =
                          order.status?.toLowerCase() ===
                          "delivered";

                        return (

                          <div
                            key={i}
                            className="timeline-step"
                          >

                            <div
                              className={`timeline-circle
                                ${completed ? "completed" : ""}
                                ${current ? "current" : ""}
                                ${
                                  delivered
                                    ? "completed"
                                    : ""
                                }`}
                            >
                              <Icon size={18} />
                            </div>

                            <span
                              className={
                                completed ||
                                current ||
                                delivered
                                  ? "active-text"
                                  : ""
                              }
                            >
                              {step.title}
                            </span>

                          </div>

                        );

                      })}

                    </div>

                  </div>

                  {/* =========================
                      BOTTOM
                  ========================= */}

                  <div className="order-bottom">

                    <div className="eta">

                      <strong>Status:</strong>

                      <span className="eta-status">
                        {order.status}
                      </span>

                    </div>

                    <div className="order-actions">

                      <button
                        className="track-btn"
                        onClick={() =>
                          navigate(
                            `/track-order/${order.id}`
                          )
                        }
                      >
                        Track Order
                      </button>

                      <button
                        className="details-btn"
                        onClick={() =>
                          navigate(
                            `/order-details/${order.id}`
                          )
                        }
                      >
                        View Details

                        <ArrowRight size={18} />

                      </button>

                    </div>

                  </div>
                                  </div>

              );

            })

          )}

        </div>

      </div>

    </div>

  );

}

export default MyOrders;
