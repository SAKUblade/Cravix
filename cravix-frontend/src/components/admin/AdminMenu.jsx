import { useEffect, useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  UtensilsCrossed,
  Loader2,
} from "lucide-react";

import API from "../../services/api";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

import "./AdminMenu.css";

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    restaurant_id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    image_url: "",
    is_available: 1,
  });

  useEffect(() => {
    fetchMenuItems();
    fetchRestaurants();
  }, []);

  // =========================
  // FETCH MENU ITEMS
  // =========================

  const fetchMenuItems = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/menu");

      if (data.success) {
        setMenuItems(data.menuItems || []);
      }
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH RESTAURANTS
  // =========================

  const fetchRestaurants = async () => {
    try {
      const { data } = await API.get("/restaurants");

      console.log("Restaurants API response:", data);

      // /api/restaurants currently returns the array directly
      if (Array.isArray(data)) {
        setRestaurants(data);
      }
      // Also support { restaurants: [...] } if the backend changes later
      else if (Array.isArray(data?.restaurants)) {
        setRestaurants(data.restaurants);
      } else {
        console.error("Unexpected restaurants response:", data);
        setRestaurants([]);
      }
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
      setRestaurants([]);
    }
  };

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      restaurant_id: "",
      name: "",
      description: "",
      price: "",
      category: "",
      image_url: "",
      is_available: 1,
    });

    setEditingItem(null);
  };

  // =========================
  // ADD / UPDATE MENU ITEM
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.restaurant_id) {
      alert("Please select a restaurant.");
      return;
    }

    if (!formData.name.trim()) {
      alert("Please enter a menu item name.");
      return;
    }

    if (!formData.price) {
      alert("Please enter a price.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter a category.");
      return;
    }

    try {
      setSubmitting(true);

      if (editingItem) {
        await API.put(`/menu/${editingItem.id}`, formData);

        alert("Menu item updated successfully.");
      } else {
        await API.post("/menu", formData);

        alert("Menu item added successfully.");
      }

      resetForm();
      setShowForm(false);

      await fetchMenuItems();
    } catch (error) {
      console.error("Menu submit error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // EDIT MENU ITEM
  // =========================

  const handleEdit = (item) => {
    setEditingItem(item);

    setFormData({
      restaurant_id: item.restaurant_id || "",
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
      image_url: item.image_url || "",
      is_available: item.is_available ?? 1,
    });

    setShowForm(true);
  };

  // =========================
  // DELETE MENU ITEM
  // =========================

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(item.id);

      await API.delete(`/menu/${item.id}`);

      setMenuItems((prev) =>
        prev.filter(
          (menuItem) => menuItem.id !== item.id
        )
      );

      alert("Menu item deleted successfully.");
    } catch (error) {
      console.error(
        "Delete menu item error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete menu item."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================
  // TOGGLE AVAILABILITY
  // =========================

  const handleToggleAvailability = async (item) => {
    try {
      await API.patch(`/menu/${item.id}/toggle`);

      setMenuItems((prev) =>
        prev.map((menuItem) =>
          menuItem.id === item.id
            ? {
                ...menuItem,
                is_available:
                  menuItem.is_available ? 0 : 1,
              }
            : menuItem
        )
      );
    } catch (error) {
      console.error(
        "Toggle availability error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update availability."
      );
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <div className="admin-menu-page">
          {/* HEADER */}
          <div className="admin-menu-header">
            <div>
              <h1>Menu Management</h1>

              <p>
                Manage food items, prices and
                availability.
              </p>
            </div>

            <button
              className="add-menu-btn"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              type="button"
            >
              <Plus size={18} />

              Add Menu Item
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <div className="menu-form-card">
              <div className="menu-form-header">
                <div>
                  <h2>
                    {editingItem
                      ? "Edit Menu Item"
                      : "Add Menu Item"}
                  </h2>

                  <p>
                    Enter the details of your food
                    item.
                  </p>
                </div>

                <button
                  type="button"
                  className="close-form-btn"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="menu-form-grid">
                  {/* RESTAURANT */}
                  <div className="form-group">
                    <label>Restaurant</label>

                    <select
                      name="restaurant_id"
                      value={formData.restaurant_id}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select restaurant
                      </option>

                      {restaurants.map(
                        (restaurant) => (
                          <option
                            key={restaurant.id}
                            value={restaurant.id}
                          >
                            {restaurant.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* FOOD NAME */}
                  <div className="form-group">
                    <label>Food Name</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Chicken Biryani"
                    />
                  </div>

                  {/* PRICE */}
                  <div className="form-group">
                    <label>Price</label>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 249"
                      min="0"
                    />
                  </div>

                  {/* CATEGORY */}
                  <div className="form-group">
                    <label>Category</label>

                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Biryani"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="form-group full-width">
                    <label>Description</label>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the food item..."
                      rows="3"
                    />
                  </div>

                  {/* IMAGE */}
                  <div className="form-group full-width">
                    <label>Image URL</label>

                    <input
                      type="text"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* FORM BUTTONS */}
                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-menu-btn"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={17}
                          className="spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={17} />

                        {editingItem
                          ? "Update Item"
                          : "Add Item"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MENU CONTENT */}
          {loading ? (
            <div className="menu-loading">
              <Loader2
                size={30}
                className="spin"
              />

              <p>Loading menu...</p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="empty-menu">
              <UtensilsCrossed size={45} />

              <h2>No menu items yet</h2>

              <p>
                Add your first food item to get
                started.
              </p>
            </div>
          ) : (
            <div className="menu-table-card">
              <div className="menu-table-wrapper">
                <table className="menu-table">
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Restaurant</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id}>
                        {/* FOOD */}
                        <td>
                          <div className="menu-food-cell">
                            <div className="menu-food-image">
                              {item.image_url ? (
                                <img
                                  src={item.image_url}
                                  alt={item.name}
                                />
                              ) : (
                                <UtensilsCrossed
                                  size={20}
                                />
                              )}
                            </div>

                            <div>
                              <strong>
                                {item.name}
                              </strong>

                              {item.description && (
                                <span>
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* RESTAURANT */}
                        <td>
                          {item.restaurant_name}
                        </td>

                        {/* CATEGORY */}
                        <td>
                          <span className="menu-category">
                            {item.category}
                          </span>
                        </td>

                        {/* PRICE */}
                        <td>
                          <strong>
                            ₹
                            {Number(item.price).toFixed(
                              0
                            )}
                          </strong>
                        </td>

                        {/* STATUS */}
                        <td>
                          <button
                            type="button"
                            className={
                              item.is_available
                                ? "availability available"
                                : "availability unavailable"
                            }
                            onClick={() =>
                              handleToggleAvailability(
                                item
                              )
                            }
                          >
                            {item.is_available
                              ? "Available"
                              : "Unavailable"}
                          </button>
                        </td>

                        {/* ACTIONS */}
                        <td>
                          <div className="menu-actions">
                            <button
                              type="button"
                              className="edit-menu-btn"
                              onClick={() =>
                                handleEdit(item)
                              }
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                              type="button"
                              className="delete-menu-btn"
                              onClick={() =>
                                handleDelete(item)
                              }
                              disabled={
                                deletingId === item.id
                              }
                            >
                              {deletingId === item.id ? (
                                <Loader2
                                  size={16}
                                  className="spin"
                                />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;