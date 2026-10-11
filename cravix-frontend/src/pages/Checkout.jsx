import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";

import DeliveryForm from "../components/checkout/DeliveryForm";
import PaymentCard from "../components/checkout/PaymentCard";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import OrderPlacedAnimation from "../components/checkout/OrderPlacedAnimation";

function Checkout() {
  const navigate = useNavigate();

  const { token } = useAuth();

  const {
    cartItems,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] =
    useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    orderType: "delivery",
    note: "",
  });

  // ==========================================
  // CHECK LOGIN + CART
  // ==========================================

  useEffect(() => {
    if (!token) {
      navigate("/login?redirect=true", {
        replace: true,
        state: {
          from: {
            pathname: "/checkout",
          },
        },
      });

      return;
    }

    if (cartItems.length === 0) {
      navigate("/cart", {
        replace: true,
      });
    }
  }, [token, cartItems.length, navigate]);

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {
    // Extra security check
    if (!token) {
      navigate("/login?redirect=true", {
        state: {
          from: {
            pathname: "/checkout",
          },
        },
      });

      return;
    }

    // Check cart
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    // Validate name
    if (!formData.customerName.trim()) {
      alert("Please enter your full name.");
      return;
    }

    // Validate phone
    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    // Basic phone validation
    if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Delivery address
    if (
      formData.orderType === "delivery" &&
      !formData.address.trim()
    ) {
      alert("Please enter your delivery address.");
      return;
    }

    setLoading(true);

    try {
      // ==========================================
      // CALCULATE ORDER TOTAL
      // ==========================================

      const deliveryFee =
        totalPrice >= 499 ? 0 : 49;

      const gst = Math.round(
        totalPrice * 0.05
      );

      const grandTotal =
        totalPrice + deliveryFee + gst;

      // ==========================================
      // ORDER DATA
      // ==========================================

      const orderData = {
        restaurant_id: cartItems[0].restaurant_id,

        order_type: formData.orderType,

        subtotal: totalPrice,

        delivery_fee: deliveryFee,

        gst: gst,

        total_amount: grandTotal,

        delivery_address:
          formData.orderType === "delivery"
            ? formData.address
            : "Pickup Order",

        customer_note: formData.note,

        items: cartItems.map((item) => ({
          menu_item_id: item.id,
          item_name: item.name,
          unit_price: Number(item.price),
          quantity: item.quantity,
          subtotal:
            Number(item.price) * item.quantity,
        })),
      };

      console.log("Placing order:", orderData);

      // ==========================================
      // SEND ORDER TO BACKEND
      // ==========================================

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order response:", response.data);

      // ==========================================
      // ORDER SUCCESS
      // ==========================================

      if (response.data.success) {
        setShowSuccessAnimation(true);

        setTimeout(() => {
          clearCart();

          navigate("/order-success", {
            state: {
              orderId: response.data.orderId,
              status: "Pending",
              estimatedTime: "25-35 mins",
            },
          });
        }, 2000);
      } else {
        alert(
          response.data.message ||
            "Failed to place order."
        );
      }
    } catch (error) {
      console.error(
        "Place order error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ORDER CALCULATIONS
  // ==========================================

  const deliveryFee =
    totalPrice >= 499 ? 0 : 49;

  const gst = Math.round(
    totalPrice * 0.05
  );

  const grandTotal =
    totalPrice + deliveryFee + gst;

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 py-10">

        <div className="max-w-7xl mx-auto px-6">

          {/* BACK TO CART */}

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition"
          >
            <ArrowLeft size={20} />

            Back to Cart
          </Link>

          {/* CHECKOUT CONTENT */}

          <div className="grid lg:grid-cols-3 gap-8 mt-8">

            {/* ================================= */}
            {/* LEFT SIDE */}
            {/* ================================= */}

            <div className="lg:col-span-2 space-y-8">

              <DeliveryForm
                formData={formData}
                handleChange={handleChange}
              />

              <PaymentCard />

            </div>

            {/* ================================= */}
            {/* RIGHT SIDE */}
            {/* ================================= */}

            <div className="lg:sticky lg:top-24 self-start">

              <CheckoutSummary
                totalItems={totalItems}
                totalPrice={totalPrice}
                deliveryFee={deliveryFee}
                gst={gst}
                grandTotal={grandTotal}
                loading={loading}
                handlePlaceOrder={handlePlaceOrder}
              />

            </div>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* SUCCESS ANIMATION */}
      {/* ===================================== */}

      {showSuccessAnimation && (
        <OrderPlacedAnimation />
      )}
    </>
  );
}

export default Checkout;