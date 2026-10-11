import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import API from "../services/api";
import RestaurantCard from "./RestaurantCard";

import "./RestaurantList.css";

function RestaurantList({
  searchTerm = "",
  selectedCategory = "All",
}) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Restaurant Search
  const [restaurantSearch, setRestaurantSearch] = useState("");

  // Sort
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function loadRestaurants() {
      try {
        const res = await API.get("/restaurants");

        setRestaurants(
          Array.isArray(res.data) ? res.data : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch restaurants:",
          error
        );
        setRestaurants([]);
      } finally {
        setLoading(false);
      }
    }

    loadRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    let data = [...restaurants];

    /* ===========================
       HERO SEARCH
    =========================== */

    if (searchTerm.trim()) {
      const hero = searchTerm.toLowerCase();

      data = data.filter((restaurant) => {
        const menu =
          (restaurant.menu_items || "").toLowerCase();

        return (
          (restaurant.name || "")
            .toLowerCase()
            .includes(hero) ||

          (restaurant.category || "")
            .toLowerCase()
            .includes(hero) ||

          menu.includes(hero)
        );
      });
    }

    /* ===========================
       RESTAURANT SEARCH
    =========================== */

    if (restaurantSearch.trim()) {
      const search = restaurantSearch.toLowerCase();

      data = data.filter((restaurant) => {
        const menu =
          (restaurant.menu_items || "").toLowerCase();

        return (
          (restaurant.name || "")
            .toLowerCase()
            .includes(search) ||

          (restaurant.category || "")
            .toLowerCase()
            .includes(search) ||

          (restaurant.address || "")
            .toLowerCase()
            .includes(search) ||

          menu.includes(search)
        );
      });
    }

    /* ===========================
       CATEGORY FILTER
       (Pizza, Burger, Momos...)
    =========================== */

    if (
      selectedCategory &&
      selectedCategory !== "All"
    ) {
      const keyword =
        selectedCategory.toLowerCase();

      data = data.filter((restaurant) => {
        const menu =
          (restaurant.menu_items || "").toLowerCase();

        return (
          (restaurant.category || "")
            .toLowerCase()
            .includes(keyword) ||

          (restaurant.name || "")
            .toLowerCase()
            .includes(keyword) ||

          menu.includes(keyword)
        );
      });
    }

    /* ===========================
       SORTING
    =========================== */

    switch (sortBy) {
      case "popular":
        data.sort((a, b) => {
          const popularA =
            a.total_orders ||
            a.orders ||
            a.popularity ||
            0;

          const popularB =
            b.total_orders ||
            b.orders ||
            b.popularity ||
            0;

          return popularB - popularA;
        });
        break;

      case "rating":
        data.sort((a, b) => {
          const ratingA = Number(a.rating) || 0;
          const ratingB = Number(b.rating) || 0;

          return ratingB - ratingA;
        });
        break;

      case "newest":
        data.sort((a, b) => b.id - a.id);
        break;

      case "az":
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "za":
        data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      default:
        break;
    }

    return data;
  }, [
    restaurants,
    searchTerm,
    restaurantSearch,
    selectedCategory,
    sortBy,
  ]);
  if (loading) {
    return (
      <section className="restaurant-section">
        <div className="restaurant-container">
          <h2 className="loading-title">
            Loading Restaurants...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="restaurant-section">
      <div className="restaurant-container">

        {/* ================= HEADER ================= */}

        <div className="restaurant-header">

          <div className="restaurant-hero">

            {/* LEFT */}

            <div className="restaurant-left">

              <h2 className="restaurant-title">
                Discover the Best Food
                <br />
                Near You
              </h2>

              <p className="restaurant-details-description">
                Browse restaurants by cuisine or your
                favorite dishes.
              </p>

            </div>

            {/* RIGHT */}

            <div className="restaurant-right">

              <div className="restaurant-search">

                <FaSearch className="search-icon" />

                <input
                  type="text"
                  placeholder="Search restaurants or food..."
                  value={restaurantSearch}
                  onChange={(e) =>
                    setRestaurantSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <select
                className="restaurant-sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >

                <option value="default">
                  Default
                </option>

                <option value="popular">
                  Most Popular
                </option>

                <option value="rating">
                  Highest Rated
                </option>

                <option value="newest">
                  Newest
                </option>

                <option value="az">
                  A - Z
                </option>

                <option value="za">
                  Z - A
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* ================= RESULT COUNT ================= */}

        <div
          style={{
            marginBottom: "25px",
            fontWeight: "600",
            color: "#666",
          }}
        >
          Showing{" "}
          <span
            style={{
              color: "#ff4d4f",
              fontWeight: "700",
            }}
          >
            {filteredRestaurants.length}
          </span>{" "}
          restaurant
          {filteredRestaurants.length !== 1
            ? "s"
            : ""}
        </div>

        {/* ================= RESTAURANT GRID ================= */}

        {filteredRestaurants.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🍽️
            </div>

            <h2>
              No Restaurants Found
            </h2>

            <p>
              Try another search or category.
            </p>

          </div>

        ) : (

          <div className="restaurant-grid">

            {filteredRestaurants.map(
              (restaurant) => (

                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />

              )
            )}

          </div>

        )}

      </div>
    </section>
  );
}

export default RestaurantList;