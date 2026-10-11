import {
  Banknote,
  ShieldCheck,
} from "lucide-react";

import "./PaymentCard.css";

function PaymentCard() {
  return (
    <div className="payment-card">

      {/* Header */}

      <div className="payment-header">

        <div className="payment-icon">
          <Banknote size={24} />
        </div>

        <div className="payment-heading">

          <h2>Payment Method</h2>

          <p>
            Choose how you'd like to pay.
          </p>

        </div>

      </div>

      {/* Payment Option */}

      <label className="payment-option">

        <div className="payment-left">

          <input
            type="radio"
            checked
            readOnly
          />

          <div>

            <h3>
              Cash on Delivery
            </h3>

            <p>
              Pay in cash when your order arrives.
            </p>

          </div>

        </div>

        <Banknote
          size={30}
          className="payment-method-icon"
        />

      </label>

      {/* Security */}

      <div className="payment-security">

        <ShieldCheck
          size={24}
          className="security-icon"
        />

        <div>

          <h4>
            Secure Checkout
          </h4>

          <p>
            Your personal information is protected.
            Online payments (UPI, Cards & Wallets)
            will be available in a future update.
          </p>

        </div>

      </div>

    </div>
  );
}

export default PaymentCard;