const express = require("express");

const router = express.Router();

const menuController = require("../controllers/menuController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Get all menu items
router.get(
  "/",
  authenticateUser,
  authorizeAdmin,
  menuController.getMenuItems
);

// Get menu items for a specific restaurant
router.get(
  "/restaurant/:restaurantId",
  authenticateUser,
  authorizeAdmin,
  menuController.getMenuItemsByRestaurant
);

// Get one menu item
router.get(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  menuController.getMenuItem
);

// Create menu item
router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  menuController.createMenuItem
);

// Update menu item
router.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  menuController.updateMenuItem
);

// Delete menu item
router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  menuController.deleteMenuItem
);

// Toggle menu item availability
router.patch(
  "/:id/toggle",
  authenticateUser,
  authorizeAdmin,
  menuController.toggleMenuItemAvailability
);

module.exports = router;