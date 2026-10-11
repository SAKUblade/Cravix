const Restaurant = require("../models/restaurantModel");

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.getAllRestaurants();

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Search food
const searchFood = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.json([]);
    }

    const foods = await Restaurant.searchFood(q.trim());

    res.json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get single restaurant
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.getRestaurantById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get restaurant menu
const getRestaurantMenu = async (req, res) => {
  try {
    const menu = await Restaurant.getRestaurantMenu(req.params.id);

    res.json(menu);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get recommended food
const getRecommendedFood = async (req, res) => {
  try {
    const foods = await Restaurant.getRecommendedFood();

    res.json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create restaurant
const createRestaurant = async (req, res) => {
  try {
    const id = await Restaurant.createRestaurant(req.body);

    res.status(201).json({
      message: "Restaurant created successfully",
      id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Restaurant.deleteRestaurant(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      message: "Restaurant removed successfully",
    });
  } catch (error) {
    console.error("Delete restaurant error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getRestaurants,
  searchFood,
  getRestaurant,
  getRestaurantMenu,
  getRecommendedFood,
  createRestaurant,
  deleteRestaurant,
};