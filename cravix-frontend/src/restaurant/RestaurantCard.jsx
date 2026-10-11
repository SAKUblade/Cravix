import { Link } from "react-router-dom";
import {
  Heart,
  Star,
  Clock3,
  MapPin,
  Bike,
  ArrowRight,
} from "lucide-react";

import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  const {
  id,
  name,
  category,
  description,
  image_url,
  image,
  rating,
  address,
  delivery_time,
  price_for_two,
  is_open,
} = restaurant;

  return (
    <div className="restaurant-card">
      <div className="restaurant-card-image">
        <img
  src={image_url || image || "https://placehold.co/600x400"}
  alt={name}
/>

        {/* Rating */}
        <div className="restaurant-rating">
          <Star size={14} fill="currentColor" />
          <span>{rating || "4.8"}</span>
        </div>

        {/* Favourite */}
        <button className="restaurant-favourite">
          <Heart size={18} />
        </button>

        {/* Status */}
        <div
          className={`restaurant-status ${
            is_open ? "open" : "closed"
          }`}
        >
          {is_open ? "Open" : "Closed"}
        </div>

        {/* Category Badge */}
        <div className="restaurant-category">
          {category}
        </div>
      </div>

      <div className="restaurant-card-content">
        <h3 className="restaurant-name">{name}</h3>

        <p className="restaurant-description">
          {description}
            </p>

        <div className="restaurant-info">
          <div className="restaurant-location">
            <MapPin size={15} />
            <span>{address}</span>
          </div>

          <div className="restaurant-meta">
            <div>
              <Clock3 size={15} />
              <span>{delivery_time}</span>
            </div>

            <span>{price_for_two}</span>
          </div>
        </div>

        <div className="delivery-badge">
          <Bike size={15} />
          <span>Free Delivery</span>
        </div>

        <Link
          to={`/restaurants/${id}`}
          className="restaurant-btn"
        >
          View Menu
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default RestaurantCard;