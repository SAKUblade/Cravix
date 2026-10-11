import { useEffect, useState } from "react";

import {
  Plus,
  Store,
  MapPin,
  UtensilsCrossed,
  X,
  Loader2,
  Trash2,
} from "lucide-react";

import API from "../../services/api";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

import "./AdminRestaurants.css";

function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    address: "",
    category: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/restaurants");

      setRestaurants(data || []);
    } catch (error) {
      console.error("Failed to load restaurants:", error);

      alert("Failed to load restaurants.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Restaurant name is required.");
      return;
    }

    if (!formData.address.trim()) {
      alert("Restaurant address is required.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Restaurant category is required.");
      return;
    }

    try {
      setSubmitting(true);

      await API.post("/restaurants", {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image_url: formData.image_url.trim(),
        address: formData.address.trim(),
        category: formData.category.trim(),
      });

      alert("Restaurant created successfully.");

      setFormData({
        name: "",
        description: "",
        image_url: "",
        address: "",
        category: "",
      });

      setShowForm(false);

      await fetchRestaurants();
    } catch (error) {
      console.error("Failed to create restaurant:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create restaurant."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE RESTAURANT
  // =========================

  const handleDelete = async (restaurant) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${restaurant.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(restaurant.id);

      await API.delete(`/restaurants/${restaurant.id}`);

      setRestaurants((previous) =>
        previous.filter(
          (item) => item.id !== restaurant.id
        )
      );

      alert("Restaurant removed successfully.");
    } catch (error) {
      console.error("Failed to delete restaurant:", error);

      alert(
        error.response?.data?.message ||
          "Failed to remove restaurant."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}

      <AdminSidebar />

      {/* MAIN AREA */}

      <div className="admin-main">

        {/* NAVBAR */}

        <AdminNavbar />

        {/* RESTAURANTS CONTENT */}

        <div className="admin-restaurants">

          {/* =========================
              HEADER
          ========================= */}

          <div className="restaurants-header">

            <div>
              <h1>Restaurants</h1>

              <p>
                Manage restaurants available on Cravix
              </p>
            </div>

            <button
              className="add-restaurant-btn"
              onClick={() => setShowForm(true)}
              type="button"
            >
              <Plus size={18} />

              Add Restaurant
            </button>

          </div>

          {/* =========================
              RESTAURANT COUNT
          ========================= */}

          <div className="restaurants-count">

            <Store size={18} />

            <div>
              <strong>{restaurants.length}</strong>

              <span>Total Restaurants</span>
            </div>

          </div>

          {/* =========================
              ADD RESTAURANT FORM
          ========================= */}

          {showForm && (
            <div className="restaurant-form-card">

              <div className="restaurant-form-header">

                <div>
                  <h2>Add Restaurant</h2>

                  <p>
                    Create a new restaurant for Cravix
                  </p>
                </div>

                <button
                  className="close-form-btn"
                  onClick={() => setShowForm(false)}
                  type="button"
                >
                  <X size={20} />
                </button>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-grid">

                  {/* NAME */}

                  <div className="form-group">

                    <label>
                      Restaurant Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Cravix Kitchen"
                    />

                  </div>

                  {/* CATEGORY */}

                  <div className="form-group">

                    <label>
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Pizza, Biryani, Burgers"
                    />

                  </div>

                  {/* ADDRESS */}

                  <div className="form-group full-width">

                    <label>
                      Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Restaurant address"
                    />

                  </div>

                  {/* IMAGE */}

                  <div className="form-group full-width">

                    <label>
                      Image URL
                    </label>

                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://example.com/restaurant.jpg"
                    />

                  </div>

                  {/* DESCRIPTION */}

                  <div className="form-group full-width">

                    <label>
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the restaurant..."
                      rows="4"
                    />

                  </div>

                </div>

                {/* FORM ACTIONS */}

                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-restaurant-btn"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={17}
                          className="spin"
                        />

                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus size={17} />

                        Create Restaurant
                      </>
                    )}
                  </button>

                </div>

              </form>

            </div>
          )}

          {/* =========================
              RESTAURANT LIST
          ========================= */}

          {loading ? (

            <div className="restaurants-loading">

              <Loader2
                size={25}
                className="spin"
              />

              <span>
                Loading restaurants...
              </span>

            </div>

          ) : restaurants.length === 0 ? (

            <div className="restaurants-empty">

              <Store size={40} />

              <h2>
                No restaurants yet
              </h2>

              <p>
                Add your first restaurant to get started.
              </p>

            </div>

          ) : (

            <div className="restaurants-grid">

              {restaurants.map((restaurant) => (

                <div
                  className="restaurant-admin-card"
                  key={restaurant.id}
                >

                  {/* IMAGE */}

                  <div className="restaurant-image">

                    {restaurant.image_url ? (
                      <img
                        src={restaurant.image_url}
                        alt={restaurant.name}
                      />
                    ) : (
                      <Store size={38} />
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="restaurant-card-content">

                    <div className="restaurant-card-title">

                      <div>
                        <h3>
                          {restaurant.name}
                        </h3>

                        <span className="restaurant-category">
                          {restaurant.category || "Restaurant"}
                        </span>
                      </div>

                    </div>

                    {restaurant.description && (
                      <p className="restaurant-description">
                        {restaurant.description}
                      </p>
                    )}

                    {/* ADDRESS */}

                    <div className="restaurant-address">

                      <MapPin size={15} />

                      <span>
                        {restaurant.address ||
                          "No address provided"}
                      </span>

                    </div>

                    {/* MENU COUNT */}

                    <div className="restaurant-menu-info">

                      <UtensilsCrossed size={15} />

                      <span>
                        {restaurant.menu_items
                          ? restaurant.menu_items
                              .split(",")
                              .filter(Boolean)
                              .length
                          : 0}{" "}
                        menu items
                      </span>

                    </div>

                    {/* DELETE BUTTON */}

                    <button
                      type="button"
                      className="remove-restaurant-btn"
                      onClick={() =>
                        handleDelete(restaurant)
                      }
                      disabled={
                        deletingId === restaurant.id
                      }
                    >
                      {deletingId === restaurant.id ? (
                        <>
                          <Loader2
                            size={15}
                            className="spin"
                          />

                          Removing...
                        </>
                      ) : (
                        <>
                          <Trash2 size={15} />

                          Remove Restaurant
                        </>
                      )}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AdminRestaurants;