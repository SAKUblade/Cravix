const express = require("express");
const router = express.Router();

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

const {
  getDashboardStats
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  authenticateUser,
  authorizeAdmin,
  getDashboardStats
);

module.exports = router;