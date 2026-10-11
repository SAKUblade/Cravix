import {
  Trash2,
  Plus,
  Minus,
  Star,
} from "lucide-react";

import { useCart } from "../../context/useCart";
import "./CartItem.css";

function CartItem({ item }) {
  const {
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const total = Number(item.price) * item.quantity;

return (
  <div className="cart-item">

    <div className="cart-item-wrapper">

      {/* Image */}
      <div className="cart-item-image">

        <img
          src={
            item.image_url ||
            "https://placehold.co/600x600?text=Food"
          }
          alt={item.name}
          className="cart-item-image-img"
        />

        <span className="absolute top-4 left-4 bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full shadow">
          Bestseller
        </span>

      </div>

      {/* Content */}
      <div className="cart-item-content">

        {/* Top */}
        <div>

          <div className="flex items-start justify-between gap-4">

            <div>

              <h2 className="cart-item-title">
                {item.name}
              </h2>

              <p className="cart-item-restaurant">
                {item.restaurant_name || "Cravix Kitchen"}
              </p>

            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="w-11 h-11 rounded-xl border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition flex items-center justify-center"
            >
              <Trash2 size={18} />
            </button>

          </div>

          <div className="flex items-center gap-3 mt-4">

            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">

              <Star
                size={15}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-sm font-semibold">
                4.8
              </span>

            </div>

            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Fresh
            </span>

            <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">
              Hot
            </span>

          </div>

          {item.description && (
            <p className="mt-5 text-gray-500 leading-7 line-clamp-2">
              {item.description}
            </p>
          )}

        </div>

        {/* Bottom */}
        <div className="cart-item-footer">

          {/* Quantity */}
          <div className="flex items-center rounded-2xl bg-gray-100 p-1">

            <button
              onClick={() => decreaseQty(item.id)}
              className="w-12 h-12 hover:bg-red-50 transition flex items-center justify-center"
            >
              <Minus size={18} />
            </button>

            <span className="w-14 text-center font-bold text-lg">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQty(item.id)}
              className="w-12 h-12 hover:bg-red-50 transition flex items-center justify-center"
            >
              <Plus size={18} />
            </button>

          </div>

          {/* Price */}
          <div className="text-right">

            <p className="text-gray-400 text-sm">
              ₹{item.price} × {item.quantity}
            </p>

            <h2 className="text-5xl font-black text-red-600 leading-none">
              ₹{total}
            </h2>

          </div>

        </div>

      </div>

    </div>

  </div>
  );
}

export default CartItem;