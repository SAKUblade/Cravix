import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Receipt,
  Clock3,
  PackageCheck,
  Banknote,
  Store,
  ChefHat,
  Bike,
  Home,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import "./OrderSuccess.css";

function OrderSuccess() {
  const { state } = useLocation();

  const orderId = state?.orderId || "N/A";
  const status = state?.status || "Pending";
  const estimatedTime = state?.estimatedTime || "25–35 mins";

  return (
    <div className="success-page">

      {/* Background Decorations */}

      <div className="bg-circle circle-1"></div>
      <div className="bg-circle circle-2"></div>
      <div className="bg-circle circle-3"></div>

      {/* Confetti */}

      <span className="confetti c1"></span>
      <span className="confetti c2"></span>
      <span className="confetti c3"></span>
      <span className="confetti c4"></span>
      <span className="confetti c5"></span>
      <span className="confetti c6"></span>
      <span className="confetti c7"></span>
      <span className="confetti c8"></span>

      <div className="success-card">

        {/* Success Icon */}

        <div className="success-icon">
          <CheckCircle2 size={70} />
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-subtitle">
          Thank you for ordering with <strong>Cravix.</strong>
          <br />
          Your delicious meal is now being prepared.
        </p>

        {/* ==========================
            ORDER INFO
        =========================== */}

        <div className="order-info-grid">

          <div className="info-card">

            <Receipt className="info-icon red" />

            <div className="info-content">
              <span>Order Number</span>
              <h3>#{orderId}</h3>
            </div>

          </div>

          <div className="info-card">

            <PackageCheck className="info-icon orange" />

            <div className="info-content">
              <span>Status</span>
              <h3 className="pending">{status}</h3>
            </div>

          </div>

          <div className="info-card">

            <Clock3 className="info-icon blue" />

            <div className="info-content">
              <span>Estimated Delivery</span>
              <h3>{estimatedTime}</h3>
            </div>

          </div>

          <div className="info-card">

            <Banknote className="info-icon green" />

            <div className="info-content">
              <span>Payment</span>
              <h3>Cash on Delivery</h3>
            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="timeline-box">

          <h2>What happens next?</h2>

          <div className="timeline">

            <div className="timeline-item">

              <div className="timeline-icon active">
                <Store size={20} />
              </div>

              <div>

                <h4>Restaurant accepts your order</h4>

                <p>
                  We'll notify you once the restaurant confirms your order.
                </p>

              </div>

            </div>

            <div className="timeline-item">

              <div className="timeline-icon">
                <ChefHat size={20} />
              </div>

              <div>

                <h4>Food is being prepared</h4>

                <p>
                  The chef starts preparing your delicious meal.
                </p>

              </div>

            </div>

            <div className="timeline-item">

              <div className="timeline-icon">
                <Bike size={20} />
              </div>

              <div>

                <h4>Delivery partner assigned</h4>

                <p>
                  Your order will be picked up for delivery.
                </p>

              </div>

            </div>

            <div className="timeline-item">

              <div className="timeline-icon">
                <Home size={20} />
              </div>

              <div>

                <h4>Out for delivery</h4>

                <p>
                  Sit back and relax. Your food is almost there.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="success-buttons">

          <Link
            to="/my-orders"
            className="primary-btn"
          >
            <ShoppingBag size={20} />
            View My Orders
            <ArrowRight size={20} />
          </Link>

          <Link
            to="/"
            className="secondary-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;