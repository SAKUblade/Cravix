import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Store,
  ChefHat,
  Bike,
  Home,
  Phone,
  MessageCircle,
  MapPin,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import API from "../services/api";

import "./TrackOrder.css";

function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH ORDER
  ========================================================= */

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/orders/${id}`);

        console.log("Track order response:", response.data);

        if (response.data?.success) {
          setOrder(response.data.order);
        } else {
          setError(
            response.data?.message || "Order could not be found."
          );
        }
      } catch (err) {
        console.error(
          "Failed to fetch tracking order:",
          err.response?.data || err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load order tracking."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="track-page">
        <div className="track-container">
          <div
            className="track-card"
            style={{
              textAlign: "center",
              padding: "70px 20px",
            }}
          >
            <div
              className="loading-spinner"
              style={{
                width: "42px",
                height: "42px",
                margin: "0 auto 18px",
                border: "4px solid #fee2e2",
                borderTop: "4px solid #dc2626",
                borderRadius: "50%",
                animation: "trackSpin 0.8s linear infinite",
              }}
            />

            <h2>Loading order...</h2>

            <p
              style={{
                marginTop: "8px",
                color: "#6b7280",
              }}
            >
              Please wait while we fetch your order status.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !order) {
    return (
      <div className="track-page">
        <div className="track-container">
          <div
            className="track-card"
            style={{
              textAlign: "center",
              padding: "70px 20px",
            }}
          >
            <h2>Order Not Found</h2>

            <p
              style={{
                marginTop: "10px",
                color: "#6b7280",
              }}
            >
              {error ||
                "This order could not be loaded."}
            </p>

            <button
              onClick={() => navigate("/my-orders")}
              style={{
                marginTop: "25px",
                padding: "12px 20px",
                border: "none",
                borderRadius: "12px",
                background: "#dc2626",
                color: "#ffffff",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Back to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     STATUS
  ========================================================= */

  const normalizedStatus =
    order.status?.toLowerCase();

  const getCurrentStep = () => {
    switch (normalizedStatus) {
      case "pending":
        return -1;

      case "accepted":
        return 0;

      case "preparing":
        return 1;

      case "ready":
      case "out for delivery":
        return 2;

      case "delivered":
        return 3;

      case "cancelled":
        return -2;

      default:
        return -1;
    }
  };

  const currentStep = getCurrentStep();

  /* =========================================================
     TIMELINE
  ========================================================= */

  const timeline = [
    {
      title: "Restaurant Accepted",
      description:
        normalizedStatus === "pending"
          ? "Waiting for the restaurant to accept your order."
          : "Your order has been confirmed.",
      icon: Store,
    },
    {
      title: "Preparing Food",
      description:
        "Chef is preparing your meal.",
      icon: ChefHat,
    },
    {
      title: "Out For Delivery",
      description:
        "Your order is on the way.",
      icon: Bike,
    },
    {
      title: "Delivered",
      description:
        "Enjoy your delicious meal.",
      icon: Home,
    },
  ];

  /* =========================================================
     CURRENT STATUS TEXT
  ========================================================= */

  const getStatusText = () => {
    switch (normalizedStatus) {
      case "pending":
        return "Pending";

      case "accepted":
        return "Accepted";

      case "preparing":
        return "Preparing";

      case "ready":
        return "Ready";

      case "out for delivery":
        return "Out for Delivery";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Cancelled";

      default:
        return order.status || "Pending";
    }
  };

  const getProgressTitle = () => {
    switch (normalizedStatus) {
      case "pending":
        return "Waiting for confirmation...";

      case "accepted":
        return "Restaurant accepted your order.";

      case "preparing":
        return "Preparing your food...";

      case "ready":
        return "Your food is ready!";

      case "out for delivery":
        return "Your order is on the way!";

      case "delivered":
        return "Order delivered!";

      case "cancelled":
        return "Order cancelled";

      default:
        return "Processing your order...";
    }
  };

  const getProgressDescription = () => {
    switch (normalizedStatus) {
      case "pending":
        return "The restaurant will confirm your order shortly.";

      case "accepted":
        return "The restaurant has accepted your order.";

      case "preparing":
        return "Chef has started preparing your order.";

      case "ready":
        return "Your order is ready for pickup.";

      case "out for delivery":
        return "Your delivery partner is on the way.";

      case "delivered":
        return "Your order has been successfully delivered.";

      case "cancelled":
        return "This order has been cancelled.";

      default:
        return "Your order is being processed.";
    }
  };

  /* =========================================================
     ETA
  ========================================================= */

  const getEstimatedTime = () => {
    switch (normalizedStatus) {
      case "pending":
        return "Waiting";

      case "accepted":
        return "25 - 35 mins";

      case "preparing":
        return "20 - 30 mins";

      case "ready":
        return "10 - 15 mins";

      case "out for delivery":
        return "10 - 15 mins";

      case "delivered":
        return "Delivered";

      case "cancelled":
        return "Cancelled";

      default:
        return "25 - 35 mins";
    }
  };

  const estimatedTime = getEstimatedTime();

  /* =========================================================
     DATE
  ========================================================= */

  const formattedDate = order.created_at
    ? new Date(order.created_at).toLocaleString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }
      )
    : "N/A";

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="track-page">
      <div className="track-container">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="track-header">

          <Link
            to="/my-orders"
            className="back-btn"
          >
            <ArrowLeft size={18} />

            Back
          </Link>

          <div>
            <h1>Track Order</h1>

            <p>
              Order #{order.id}
            </p>
          </div>

        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="track-card">

          {/* ===================================================
              RESTAURANT
          =================================================== */}

          <div className="restaurant-box">

            <div>

              <h2>
                {order.restaurant_name ||
                  `Restaurant #${order.restaurant_id}`}
              </h2>

              <p>
                Your Cravix order
              </p>

            </div>

            <span
              className={`status-badge ${
                normalizedStatus === "delivered"
                  ? "delivered"
                  : normalizedStatus === "cancelled"
                  ? "cancelled"
                  : "preparing"
              }`}
            >

              {normalizedStatus !== "delivered" &&
                normalizedStatus !== "cancelled" && (
                  <span className="live-dot"></span>
                )}

              {getStatusText()}

            </span>

          </div>

          {/* ===================================================
              ETA
          =================================================== */}

          <div className="live-eta">

            <Clock3 size={22} />

            <div>

              <span>
                Estimated Delivery
              </span>

              <h3>
                {estimatedTime}
              </h3>

            </div>

          </div>

          {/* ===================================================
              DRIVER
          =================================================== */}

          <div className="driver-box">

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Delivery Partner"
            />

            <div className="driver-info">

              <h3>
                Delivery Partner
              </h3>

              <p>
                Your delivery partner
              </p>

            </div>

            <div className="driver-actions">

              <button
                type="button"
                title="Call delivery partner"
                onClick={() =>
                  alert(
                    "Calling the delivery partner will be available soon."
                  )
                }
              >
                <Phone size={18} />
              </button>

              <button
                type="button"
                title="Message delivery partner"
                onClick={() =>
                  alert(
                    "Messaging will be available soon."
                  )
                }
              >
                <MessageCircle size={18} />
              </button>

            </div>

          </div>

          {/* ===================================================
              LIVE PROGRESS
          =================================================== */}

          <div className="progress-card">

            <div className="progress-header">

              <div>

                <span className="progress-label">
                  LIVE ORDER STATUS
                </span>

                <h2>
                  {getProgressTitle()}
                </h2>

                <p>
                  {getProgressDescription()}
                </p>

              </div>

              <div className="eta-pill">
                {estimatedTime}
              </div>

            </div>

            <div className="progress-steps">

              {timeline.map((step, index) => {

                const Icon = step.icon;

                const completed =
                  currentStep >= 0 &&
                  index < currentStep;

                const active =
                  index === currentStep;

                return (
                  <div
                    className="progress-row"
                    key={step.title}
                  >

                    <div
                      className={`progress-icon
                        ${completed ? "completed" : ""}
                        ${active ? "active" : ""}
                      `}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="progress-content">

                      <h4>
                        {step.title}
                      </h4>

                      <p>
                        {step.description}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* ===================================================
              ADDRESS
          =================================================== */}

          <div className="address-box">

            <div className="address-title">

              <MapPin size={20} />

              <h3>
                {order.order_type === "pickup"
                  ? "Pickup"
                  : "Delivery Address"}
              </h3>

            </div>

            <p>
              {order.order_type === "pickup"
                ? "Pickup from restaurant"
                : order.delivery_address ||
                  "No delivery address provided."}
            </p>

          </div>

          {/* ===================================================
              PAYMENT
          =================================================== */}

          <div className="payment-box">

            <ShieldCheck size={22} />

            <div>

              <h3>
                Payment Method
              </h3>

              <p>
                Cash on Delivery
              </p>

            </div>

          </div>

          {/* ===================================================
              ORDER INFO
          =================================================== */}

          <div className="payment-box">

            <ShieldCheck size={22} />

            <div>

              <h3>
                Order Information
              </h3>

              <p>
                Placed on {formattedDate}
                {" • "}
                Total ₹
                {Number(
                  order.total_amount || 0
                ).toFixed(2)}
              </p>

            </div>

          </div>

          {/* ===================================================
              MAP
          =================================================== */}

          <div className="map-box">

            <div className="pulse-location">
              <MapPin size={25} />
            </div>

            <h3>
              Live Tracking Map
            </h3>

            <p>
              Real-time map integration
              will be added later.
            </p>

          </div>

          {/* ===================================================
              ACTIONS
          =================================================== */}

          <div className="track-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                alert(
                  "Order cancellation will be available soon."
                )
              }
            >
              Cancel Order
            </button>

            <button
              type="button"
              className="support-btn"
              onClick={() =>
                alert(
                  "Customer support will be available soon."
                )
              }
            >
              Contact Support
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TrackOrder;