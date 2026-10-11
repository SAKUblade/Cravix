import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/useCart";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import RecommendationSection from "../components/cart/RecommendationSection";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    totalItems,
  } = useCart();

  // ==========================
  // Empty Cart
  // ==========================
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-page">
        <div className="empty-cart-card">

          <div className="empty-cart-icon">
            <ShoppingCart size={62} />
          </div>

          <h1>Your Cart is Empty</h1>

          <p>
            Looks like you haven't added anything yet.
            <br />
            Explore restaurants and order your favourite meals.
          </p>

          <Link
            to="/"
            className="browse-restaurants-btn"
          >
            <ShoppingBag size={20} />
            <span>Browse Restaurants</span>
          </Link>

        </div>
      </div>
    );
  }

  // ==========================
  // Cart Page
  // ==========================
  return (
    <div className="cart-page">

      <div className="cart-container">

        {/* Back Button */}
        <Link
          to="/"
          className="continue-shopping-btn"
        >
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>

        {/* Header */}
        <div className="cart-header">

          <h1>
            Your Cart{" "}
            <span className="cart-count">
              ({totalItems})
            </span>
          </h1>

          <p>
            Review your selected items before proceeding to checkout.
          </p>

        </div>

        {/* Main Layout */}
        <div className="cart-layout">

          {/* Left Side */}
          <div className="cart-left">

            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>

            <RecommendationSection />

          </div>

          {/* Right Side */}
          <aside className="cart-right">
            <OrderSummary />
          </aside>

        </div>

      </div>

    </div>
  );
}

export default Cart;