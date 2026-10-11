import {
  ArrowRight,
  Truck,
  CheckCircle,
  BadgePercent,
  ShieldCheck,
  Clock3,
  Wallet,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import "./OrderSummary.css";

function OrderSummary() {
  const navigate = useNavigate();

  const { totalItems, totalPrice } = useCart();

  const FREE_DELIVERY_LIMIT = 499;

  const deliveryFee =
    totalPrice >= FREE_DELIVERY_LIMIT ? 0 : 49;

  const gst = Math.round(totalPrice * 0.05);

  const grandTotal =
    totalPrice + deliveryFee + gst;

  const amountLeft = Math.max(
    FREE_DELIVERY_LIMIT - totalPrice,
    0
  );

  const progress = Math.min(
    (totalPrice / FREE_DELIVERY_LIMIT) * 100,
    100
  );

  return (
    <div className="order-summary">

      {/* Header */}

      <div className="summary-header">

        <h2 className="text-2xl font-bold text-gray-900">
          Order Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Good food makes a good day.
        </p>

      </div>

      <div className="summary-body">

        {/* Free Delivery */}

        {deliveryFee !== 0 ? (

          <div className="mb-7">

            <div className="flex justify-between items-center mb-3">

              <span className="text-sm font-semibold text-gray-700">
                Free Delivery Progress
              </span>

              <span className="text-sm font-bold text-red-600">
                ₹{amountLeft} Left
              </span>

            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

              <div
                className="h-full bg-red-600 rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        ) : (

          <div className="delivery-success">

            <CheckCircle
              size={22}
              className="text-green-600"
            />

            <div>

              <h3 className="font-semibold text-green-700">
                Free Delivery Unlocked
              </h3>

              <p className="text-sm text-gray-600">
                Congratulations! Delivery is free.
              </p>

            </div>

          </div>

        )}

        {/* Price Details */}

        <div className="price-details">

          <div className="price-row">

            <span className="text-gray-500">
              Subtotal
            </span>

            <span className="font-semibold">
              ₹{totalPrice}
            </span>

          </div>

          <div className="price-row">

            <div className="flex items-center gap-2 text-gray-500">

              <Truck size={18} />

              Delivery

            </div>

            {deliveryFee === 0 ? (

              <span className="font-semibold text-green-600">
                FREE
              </span>

            ) : (

              <span className="font-semibold">
                ₹{deliveryFee}
              </span>

            )}

          </div>

          <div className="price-row">

            <span className="text-gray-500">
              GST (5%)
            </span>

            <span className="font-semibold">
              ₹{gst}
            </span>

          </div>

        </div>

        <div className="my-6 border-t border-gray-200"></div>
                {/* Delivery */}

        <div className="info-card">

          <Clock3
            size={22}
            className="text-red-600"
          />

          <div>

            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>

            <h4 className="font-semibold text-gray-900">
              25–35 Minutes
            </h4>

          </div>

        </div>

        {/* Payment */}

        <div className="info-card">

          <Wallet
            size={22}
            className="text-green-600"
          />

          <div>

            <p className="text-sm text-gray-500">
              Payment Method
            </p>

            <h4 className="font-semibold text-gray-900">
              Cash on Delivery
            </h4>

          </div>

        </div>

        {/* Grand Total */}

<div className="grand-total-card">

  <span className="grand-label">
    Grand Total
  </span>

  <span className="grand-price">
    ₹{grandTotal}
  </span>

</div>

        </div>

        {/* Checkout Button */}

        <button
          disabled={totalItems === 0}
          onClick={() => navigate("/checkout")}
          className={`checkout-btn ${
  totalItems === 0 ? "disabled" : ""
}`}
        >

          Proceed to Checkout

          <ArrowRight size={22} />

        </button>

        {/* Security */}

        <div className="security-text">

          <ShieldCheck
            size={18}
            className="text-green-600"
          />

          <span>
            100% Secure Checkout • Cash on Delivery
          </span>

        </div>

        {/* Offer */}

        {deliveryFee !== 0 && (

          <div className="offer-card">

            <BadgePercent
              size={20}
              className="text-yellow-600 flex-shrink-0 mt-0.5"
            />

            <p className="font-medium text-yellow-800">
              🎉 Add ₹{amountLeft} more to unlock FREE delivery.
            </p>

          </div>

        )}

      </div>


  );
}

export default OrderSummary;            