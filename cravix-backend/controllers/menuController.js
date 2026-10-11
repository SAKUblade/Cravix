const Menu = require("../models/menuModel");

// Get all menu items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.getAllMenuItems();

    res.json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.error("Get menu items error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get menu items by restaurant
const getMenuItemsByRestaurant = async (req, res) => {
  try {
    const menuItems = await Menu.getMenuItemsByRestaurant(
      req.params.restaurantId
    );

    res.json({
      success: true,
      menuItems,
    });
  } catch (error) {
    console.error("Get restaurant menu error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single menu item
const getMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.getMenuItemById(
      req.params.id
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      menuItem,
    });
  } catch (error) {
    console.error("Get menu item error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create menu item
const createMenuItem = async (req, res) => {
  try {
    const {
      restaurant_id,
      name,
      description,
      price,
      category,
      image_url,
      is_available,
    } = req.body;

    if (!restaurant_id) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is required",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu item name is required",
      });
    }

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const id = await Menu.createMenuItem({
      restaurant_id,
      name: name.trim(),
      description: description?.trim() || "",
      price,
      category: category.trim(),
      image_url: image_url?.trim() || "",
      is_available:
        is_available === undefined ? 1 : is_available,
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      id,
    });
  } catch (error) {
    console.error("Create menu item error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update menu item
const updateMenuItem = async (req, res) => {
  try {
    const {
      restaurant_id,
      name,
      description,
      price,
      category,
      image_url,
      is_available,
    } = req.body;

    if (!restaurant_id) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is required",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Menu item name is required",
      });
    }

    if (price === undefined || price === null || price === "") {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const updated = await Menu.updateMenuItem(
      req.params.id,
      {
        restaurant_id,
        name: name.trim(),
        description: description?.trim() || "",
        price,
        category: category.trim(),
        image_url: image_url?.trim() || "",
        is_available:
          is_available === undefined ? 1 : is_available,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item updated successfully",
    });
  } catch (error) {
    console.error("Update menu item error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
  try {
    const deleted = await Menu.deleteMenuItem(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu item error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Toggle availability
const toggleMenuItemAvailability = async (req, res) => {
  try {
    const updated =
      await Menu.toggleMenuItemAvailability(
        req.params.id
      );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item availability updated",
    });
  } catch (error) {
    console.error(
      "Toggle menu availability error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemsByRestaurant,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
};