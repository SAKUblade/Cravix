import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import MenuItemCard from "../restaurant/MenuItemCard";
import "./RestaurantDetails.css";

function RestaurantDetails() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // =========================
  // FETCH RESTAURANT + MENU
  // =========================

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurantRes = await API.get(
          `/restaurants/${id}`
        );

        const menuRes = await API.get(
          `/restaurants/${id}/menu`
        );

        setRestaurant(restaurantRes.data);

        setMenu(
          Array.isArray(menuRes.data)
            ? menuRes.data
            : []
        );
      } catch (err) {
        console.error(
          "Failed to fetch restaurant:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  // =========================
  // CATEGORIES
  // =========================

  const categories = useMemo(() => {
    const list = [
      ...new Set(
        menu.map(
          (item) => item.category || "Others"
        )
      ),
    ];

    return ["All", ...list];
  }, [menu]);

  // =========================
  // FILTER MENU
  // =========================

  const filteredMenu = menu.filter((item) => {
    return (
      selectedCategory === "All" ||
      (item.category || "Others") ===
        selectedCategory
    );
  });

  // =========================
  // FAVORITE
  // =========================

  const handleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem(
        "cravix-favorites"
      ) || "[]"
    );

    const exists = favorites.some(
      (item) => item.id === restaurant.id
    );

    if (exists) {
      const updatedFavorites =
        favorites.filter(
          (item) =>
            item.id !== restaurant.id
        );

      localStorage.setItem(
        "cravix-favorites",
        JSON.stringify(updatedFavorites)
      );

      alert("Removed from favorites.");
    } else {
      favorites.push({
        id: restaurant.id,
        name: restaurant.name,
        image_url: restaurant.image_url,
        category: restaurant.category,
      });

      localStorage.setItem(
        "cravix-favorites",
        JSON.stringify(favorites)
      );

      alert("Added to favorites ❤️");
    }
  };

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {
    const shareData = {
      title: restaurant.name,
      text: `Check out ${restaurant.name} on Cravix!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Restaurant link copied!");
      }
    } catch (error) {
      // User closing the share dialog is not an error
      if (error.name !== "AbortError") {
        console.error(
          "Share failed:",
          error
        );
      }
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="restaurant-loading">
        <h1>Loading Restaurant...</h1>
      </div>
    );
  }

  // =========================
  // NOT FOUND
  // =========================

  if (!restaurant) {
    return (
      <div className="restaurant-loading">
        <h1>Restaurant Not Found</h1>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="restaurant-details">

      {/* =========================
          HERO
      ========================= */}

      <section className="restaurant-hero">

        <div className="hero-banner">

          <img
            src={restaurant.image_url}
            alt={restaurant.name}
          />

          <div className="hero-overlay">

            <div className="hero-content">

              <span className="restaurant-category">
                {restaurant.category}
              </span>

              <h1 className="restaurant-details-name">
                {restaurant.name}
              </h1>

              <p className="restaurant-details-description">
                {restaurant.description}
              </p>

              {/* =========================
                  RESTAURANT STATS
              ========================= */}

              <div className="restaurant-stats">

                <div className="stat-card">
                  ⭐ 4.8 Rating
                </div>

                <div className="stat-card">
                  ⏱ 25–35 mins
                </div>

                <div className="stat-card">
                  🚚 Free Delivery
                </div>

                <div className="stat-card">
                  ₹400 for two
                </div>

              </div>

              {/* ADDRESS */}

              <p className="restaurant-address">
                📍 {restaurant.address}
              </p>

              {/* =========================
                  ACTIONS
              ========================= */}

              <div className="restaurant-actions">

                <button
                  className="favorite-btn"
                  onClick={handleFavorite}
                  type="button"
                >
                  ❤️ Favorite
                </button>

                <button
                  className="share-btn"
                  onClick={handleShare}
                  type="button"
                >
                  🔗 Share
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =========================
          MENU
      ========================= */}

      <section className="menu-section">

        <div className="menu-heading">

          <span className="menu-tag">
            🍽 OUR MENU
          </span>

          <h2>Explore Our Menu</h2>

          <p>
            Freshly prepared dishes made with
            quality ingredients. Choose your
            favorite meal and add it to your cart.
          </p>

        </div>

        {/* =========================
            CATEGORIES
        ========================= */}

        <div className="menu-categories">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
              className={
                selectedCategory === category
                  ? "category-btn active"
                  : "category-btn"
              }
            >
              {category}
            </button>

          ))}

        </div>

        {/* =========================
            MENU GRID
        ========================= */}

        {filteredMenu.length === 0 ? (

          <div className="empty-menu">
            <h3>No menu items found.</h3>
          </div>

        ) : (

          <div className="menu-grid">

            {filteredMenu.map((item) => (

              <MenuItemCard
                key={item.id}
                item={item}
              />

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default RestaurantDetails;