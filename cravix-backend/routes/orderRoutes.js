const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// ===============================
// Customer Routes
// ===============================

router.post(
  "/",
  authenticateUser,
  placeOrder
);

router.get(
  "/my-orders",
  authenticateUser,
  getUserOrders
);

router.get(
  "/:id",
  authenticateUser,
  getOrderById
);

// ===============================
// Admin Routes
// ===============================

router.get(
  "/",
  authenticateUser,
  authorizeAdmin,
  getOrders
);

router.put(
  "/:id/status",
  authenticateUser,
  authorizeAdmin,
  updateOrderStatus
);

module.exports = router;