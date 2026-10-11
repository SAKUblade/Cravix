import { useCart } from "../../context/useCart";

function CartSummary() {
  const { totalPrice } = useCart();

  const deliveryFee = totalPrice > 499 ? 0 : 40;
  const tax = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + deliveryFee + tax;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

      <h2 className="text-2xl font-bold mb-6">
        Order Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal
          </span>

          <span className="font-semibold">
            ₹{totalPrice}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Delivery
          </span>

          <span
            className={
              deliveryFee === 0
                ? "text-green-600 font-semibold"
                : "font-semibold"
            }
          >
            {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Tax (5%)
          </span>

          <span className="font-semibold">
            ₹{tax}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span className="text-red-600">
            ₹{grandTotal}
          </span>
        </div>

      </div>

      {deliveryFee === 0 ? (
        <div className="mt-6 bg-green-100 text-green-700 rounded-xl p-3 text-sm font-medium">
          🎉 You unlocked FREE Delivery!
        </div>
      ) : (
        <div className="mt-6 bg-yellow-100 text-yellow-700 rounded-xl p-3 text-sm font-medium">
          Add ₹{500 - totalPrice} more for FREE Delivery.
        </div>
      )}

      <button className="w-full mt-8 bg-red-600 hover:bg-red-700 transition text-white py-4 rounded-xl font-bold text-lg">
        Proceed to Checkout
      </button>

    </div>
  );
}

export default CartSummary;