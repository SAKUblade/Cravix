import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../../context/useCart";

function FloatingCart() {
  const location = useLocation();

  const { totalItems, totalPrice } = useCart();

  const hideOnPages = [
    "/cart",
    "/checkout",
    "/login",
    "/register",
  ];

  if (hideOnPages.includes(location.pathname)) {
    return null;
  }

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        to="/cart"
        className="group block w-80 overflow-hidden rounded-2xl bg-white shadow-2xl hover:-translate-y-1 hover:shadow-red-200/60 transition-all duration-300"
      >
        <div className="flex items-center gap-4 p-4">

          {/* Cart Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg flex-shrink-0">
            <ShoppingCart
              size={28}
              className="text-white"
            />
          </div>

          {/* Cart Info */}
          <div className="flex-1 min-w-0">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"}
                </h2>

                <p className="text-sm text-gray-500">
                  Ready to checkout
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-extrabold text-red-600 leading-none">
                  ₹{totalPrice}
                </p>
              </div>

            </div>

          </div>

          {/* Arrow */}
          <ArrowRight
            size={24}
            className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-red-600"
          />

        </div>
      </Link>
    </div>
  );
}

export default FloatingCart;