import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Store,
  CalendarDays,
  CircleCheckBig,
  Package,
  MapPin,
  CreditCard,
  Clock3,
  ChefHat,
  Bike,
  Home,
  Receipt,
} from "lucide-react";

import API from "../services/api";

import "./OrderDetails.css";

function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH ORDER
  // ==========================================

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/orders/${id}`);

        console.log(
          "Order details response:",
          response.data
        );

        if (response.data?.success) {
          setOrder(response.data.order);
          setItems(response.data.items || []);
        } else {
          setError(
            response.data?.message ||
              "Order not found."
          );
        }
      } catch (err) {
        console.error(
          "Failed to fetch order:",
          err.response?.data || err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load order details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <div className="details-loading">
            <div className="loading-spinner"></div>

            <h2>Loading order...</h2>

            <p>
              Please wait while we fetch your order details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-container">
          <div className="order-not-found">
            <div className="not-found-icon">
              <Receipt size={34} />
            </div>

            <h1>Order Not Found</h1>

            <p>
              {error ||
                "This order doesn't exist or could not be loaded."}
            </p>

            <button
              className="reorder-btn"
              onClick={() =>
                navigate("/my-orders")
              }
            >
              Back to My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // STATUS HELPERS
  // ==========================================

  const normalizedStatus =
    order.status?.toLowerCase();

  const getStatusClass = () => {
    switch (normalizedStatus) {
      case "delivered":
        return "delivered";

      case "cancelled":
        return "cancelled";

      case "pending":
        return "pending";

      case "accepted":
      case "preparing":
      case "ready":
      case "out for delivery":
        return "active";

      default:
        return "pending";
    }
  };

  const getCurrentStep = () => {
    switch (normalizedStatus) {
      case "pending":
        return 0;

      case "accepted":
        return 1;

      case "preparing":
        return 2;

      case "ready":
      case "out for delivery":
        return 3;

      case "delivered":
        return 4;

      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep();

  // ==========================================
  // DATE
  // ==========================================

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

  // ==========================================
  // TOTALS
  // ==========================================

  const subtotal = Number(
    order.subtotal || 0
  );

  const deliveryFee = Number(
    order.delivery_fee || 0
  );

  const total = Number(
    order.total_amount || 0
  );

  // ==========================================
  // PAYMENT
  // ==========================================

  const paymentMethod = "Cash on Delivery";

  // ==========================================
  // TIMELINE
  // ==========================================

  const timeline = [
    {
      title: "Order Placed",
      description:
        "Your order has been successfully placed.",
      icon: Receipt,
    },
    {
      title: "Accepted",
      description:
        "The restaurant has accepted your order.",
      icon: Store,
    },
    {
      title: "Preparing",
      description:
        "The restaurant is preparing your food.",
      icon: ChefHat,
    },
    {
      title: "Out for Delivery",
      description:
        "Your order is on the way.",
      icon: Bike,
    },
    {
      title: "Delivered",
      description:
        "Your order has been delivered.",
      icon: Home,
    },
  ];

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="order-details-page">

      <div className="order-details-container">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="details-header">

          <Link
            to="/my-orders"
            className="back-btn"
          >
            <ArrowLeft size={18} />
            Back to My Orders
          </Link>

          <div>
            <h1>Order Details</h1>

            <p>
              Order #{order.id}
            </p>
          </div>

        </div>


        {/* ================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================= */}

        <div className="summary-card">

          <div className="summary-left">

            <div className="summary-icon">
              <Store size={26} />
            </div>

            <div>

              <h2>
                Restaurant #{order.restaurant_id}
              </h2>

              <p>
                Your Cravix order
              </p>

              <div className="summary-meta">

                <span>
                  <CalendarDays size={16} />
                  {formattedDate}
                </span>

                <span>
                  Order #{order.id}
                </span>

              </div>

            </div>

          </div>


          <div className="summary-right">

            <span
              className={`status ${getStatusClass()}`}
            >
              <CircleCheckBig size={16} />

              {order.status}
            </span>

            <h3>
              ₹{total.toFixed(2)}
            </h3>

          </div>

        </div>


        {/* ================================= */}
        {/* ORDER ITEMS */}
        {/* ================================= */}

        <div className="details-card">

          <div className="card-header">

            <h2>Ordered Items</h2>

            <span>
              {items.length}{" "}
              {items.length === 1
                ? "Item"
                : "Items"}
            </span>

          </div>


          <div className="order-items-list">

            {items.map((item) => (

              <div
                className="order-item"
                key={item.id}
              >

                <div className="item-image">
                  <Package size={22} />
                </div>

                <div className="item-info">

                  <h3>
                    {item.item_name}
                  </h3>

                  <p>
                    ₹
                    {Number(
                      item.unit_price
                    ).toFixed(2)}{" "}
                    × {item.quantity}
                  </p>

                </div>

                <div className="item-qty">
                  ×{item.quantity}
                </div>

                <div className="item-price">
                  ₹
                  {Number(
                    item.subtotal
                  ).toFixed(2)}
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ================================= */}
        {/* ORDER STATUS */}
        {/* ================================= */}

        <div className="details-card">

          <div className="card-header">
            <h2>Order Status</h2>
          </div>

          <div className="status-timeline">

            {timeline.map(
              (step, index) => {

                const Icon = step.icon;

                const isActive =
                  index <= currentStep;

                const isCurrent =
                  index === currentStep;

                return (
                  <div
                    className="status-step"
                    key={step.title}
                  >

                    <div
                      className={`status-step-icon ${
                        isActive
                          ? "active"
                          : ""
                      } ${
                        isCurrent
                          ? "current"
                          : ""
                      }`}
                    >
                      <Icon size={19} />
                    </div>

                    <div className="status-step-content">

                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.description}
                      </p>

                    </div>

                    {index <
                      timeline.length - 1 && (
                      <div
                        className={`status-step-line ${
                          index <
                          currentStep
                            ? "active"
                            : ""
                        }`}
                      />
                    )}

                  </div>
                );
              }
            )}

          </div>

        </div>


        {/* ================================= */}
        {/* BILL SUMMARY */}
        {/* ================================= */}

        <div className="details-card">

          <div className="card-header">

            <h2>Bill Summary</h2>

          </div>

          <div className="bill-row">

            <span>Subtotal</span>

            <span>
              ₹{subtotal.toFixed(2)}
            </span>

          </div>

          <div className="bill-row">

            <span>Delivery Fee</span>

            <span>
              {deliveryFee === 0
                ? "FREE"
                : `₹${deliveryFee.toFixed(2)}`}
            </span>

          </div>

          <div className="bill-row">

            <span>GST</span>

            <span>
              Included
            </span>

          </div>

          <div className="bill-divider"></div>

          <div className="bill-total">

            <span>Grand Total</span>

            <h2>
              ₹{total.toFixed(2)}
            </h2>

          </div>

        </div>


        {/* ================================= */}
        {/* DELIVERY ADDRESS */}
        {/* ================================= */}

        <div className="details-card">

          <div className="card-header">
            <h2>Delivery Address</h2>
          </div>

          <div className="address-info">

            <div className="address-icon">
              <MapPin size={22} />
            </div>

            <div>

              <h3>
                {order.order_type ===
                "delivery"
                  ? "Delivery"
                  : "Pickup"}
              </h3>

              <p>
                {order.delivery_address ||
                  "No address provided."}
              </p>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* PAYMENT */}
        {/* ================================= */}

        <div className="details-card">

          <div className="card-header">
            <h2>Payment</h2>
          </div>

          <div className="payment-info">

            <div className="payment-icon">
              <CreditCard size={22} />
            </div>

            <div>

              <h3>
                {paymentMethod}
              </h3>

              <p>
                Pay when your order arrives.
              </p>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* CUSTOMER NOTE */}
        {/* ================================= */}

        {order.customer_note && (
          <div className="details-card">

            <div className="card-header">
              <h2>Order Note</h2>
            </div>

            <p className="customer-note">
              {order.customer_note}
            </p>

          </div>
        )}


        {/* ================================= */}
        {/* ACTIONS */}
        {/* ================================= */}

        <div className="details-actions">

          <button
            className="reorder-btn"
            onClick={() =>
              navigate("/")
            }
          >
            Order Again
          </button>

          <button
            className="support-btn"
            onClick={() =>
              navigate(
                `/track-order/${order.id}`
              )
            }
          >
            Track Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default OrderDetails;