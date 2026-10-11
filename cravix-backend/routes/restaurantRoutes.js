const express = require("express");

const router = express.Router();

const restaurantController = require("../controllers/restaurantController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Public Routes
router.get("/", restaurantController.getRestaurants);

// Food Search API
router.get("/search-food", restaurantController.searchFood);

router.get(
  "/recommendations",
  restaurantController.getRecommendedFood
);

router.get("/:id", restaurantController.getRestaurant);

// Get menu for a restaurant
router.get("/:id/menu", restaurantController.getRestaurantMenu);

// Admin Route
router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  restaurantController.createRestaurant
);

// Admin: Delete restaurant
router.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  restaurantController.deleteRestaurant
);

module.exports = router;