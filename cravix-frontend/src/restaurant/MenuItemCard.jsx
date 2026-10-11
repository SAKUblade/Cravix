import { FaStar, FaPlus, FaLeaf } from "react-icons/fa";
import { useCart } from "../context/useCart";
import "./MenuItemCard.css";

function MenuItemCard({ item }) {
  const { addToCart } = useCart();

  return (
    <div className="menu-card">

      {/* Image */}

      <div className="menu-image-wrapper">

        <img
          src={
            item.image_url ||
            "https://placehold.co/600x400?text=Food"
          }
          alt={item.name}
          className="menu-image"
        />

        <div className="fresh-badge">
          <FaLeaf />
          <span>Fresh</span>
        </div>

        <div className="best-badge">
          🔥 Bestseller
        </div>

      </div>

      {/* Content */}

      <div className="menu-content">

        <div className="menu-top">

          <div>

            <h3 className="menu-name">
              {item.name}
              </h3>

            <div className="menu-rating">

              <FaStar className="star-icon" />

              <span>4.8</span>

              <span className="dot">•</span>

              <span>20-25 mins</span>

            </div>

          </div>

          <span className="available-badge">
            Available
          </span>

        </div>

        <p className="menu-description">
          {item.description}
        </p>

        <div className="menu-bottom">

          <div>

            <p className="price-label">
              Starting from
            </p>

            <h2 className="menu-price">
              ₹{item.price}
            </h2>

          </div>

          <button
            className="add-btn"
            onClick={() => addToCart(item)}
          >
            <FaPlus />
            Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default MenuItemCard;