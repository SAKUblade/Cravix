import {
  Receipt,
  Truck,
  ShieldCheck,
  Clock3,
  ArrowRight,
} from "lucide-react";

import "./CheckoutSummary.css";

function CheckoutSummary({
  totalItems,
  totalPrice,
  deliveryFee,
  gst,
  grandTotal,
  loading,
  handlePlaceOrder,
}) {
  const FREE_DELIVERY_LIMIT = 499;

  const amountLeft = Math.max(
    FREE_DELIVERY_LIMIT - totalPrice,
    0
  );

  const progress = Math.min(
    (totalPrice / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  return (
    <div className="checkout-summary">

      {/* Header */}

      <div className="summary-header">

        <div className="summary-icon">
          <Receipt size={24} />
        </div>

        <div className="summary-heading">

          <h2>Order Summary</h2>

          <p>{totalItems} item(s)</p>

        </div>

      </div>

      <div className="summary-body">

        {/* Free Delivery */}

        {deliveryFee !== 0 && (

          <div className="delivery-progress">

            <div className="progress-info">

              <span>
                Free Delivery Progress
              </span>

              <span className="amount-left">
                ₹{amountLeft} Left
              </span>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        )}

        {/* Price Details */}

        <div className="price-section">

          <div className="price-row">

            <span className="price-label">
              Subtotal
            </span>

            <span className="price-value">
              ₹{totalPrice}
            </span>

          </div>

          <div className="price-row">

            <div className="price-delivery">

              <Truck size={18} />

              <span>Delivery</span>

            </div>

            <span
              className={
                deliveryFee === 0
                  ? "free-delivery"
                  : "price-value"
              }
            >
              {deliveryFee === 0
                ? "FREE"
                : `₹${deliveryFee}`}
            </span>

          </div>

          <div className="price-row">

            <span className="price-label">
              GST (5%)
            </span>

            <span className="price-value">
              ₹{gst}
            </span>

          </div>

        </div>

        <div className="summary-divider"></div>

        {/* ETA */}

        <div className="delivery-time">

          <Clock3
            size={22}
            className="delivery-time-icon"
          />

          <div>

            <p>
              Estimated Delivery
            </p>

            <h4>
              25–35 Minutes
            </h4>

          </div>

        </div>

        {/* Grand Total */}

        <div className="grand-total-card">

          <span className="grand-total-label">
            Grand Total
          </span>

          <h2 className="grand-total-price">
            ₹{grandTotal}
          </h2>

        </div>

        {/* Button */}

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className={`place-order-btn ${
            loading ? "loading" : ""
          }`}
        >

          {loading
            ? "Placing Order..."
            : "Place Order"}

          {!loading && (
            <ArrowRight size={22} />
          )}

        </button>

        {/* Security */}

        <div className="checkout-security">

          <ShieldCheck
            size={18}
            className="security-icon"
          />

          <span>
            Secure Checkout • Cash on Delivery
          </span>

        </div>

      </div>

    </div>
  );
}

export default CheckoutSummary;