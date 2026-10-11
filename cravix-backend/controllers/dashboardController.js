const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    // Total orders
    const [[orders]] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    // Active restaurants
    const [[restaurants]] = await db.query(
      `SELECT COUNT(*) AS totalRestaurants
       FROM restaurants
       WHERE is_active = 1`
    );

    // Total users
    const [[users]] = await db.query(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    // Total revenue excluding cancelled orders
    const [[revenue]] = await db.query(
      `SELECT
        COALESCE(SUM(total_amount), 0) AS totalRevenue
       FROM orders
       WHERE status != 'cancelled'`
    );

    // Delivered revenue
    const [[deliveredRevenue]] = await db.query(
      `SELECT
        COALESCE(SUM(total_amount), 0) AS deliveredRevenue
       FROM orders
       WHERE status = 'delivered'`
    );

    // Active/pending order value
    const [[activeRevenue]] = await db.query(
      `SELECT
        COALESCE(SUM(total_amount), 0) AS activeRevenue
       FROM orders
       WHERE status NOT IN ('delivered', 'cancelled')`
    );

    // Cancelled order value
    const [[cancelledRevenue]] = await db.query(
      `SELECT
        COALESCE(SUM(total_amount), 0) AS cancelledRevenue
       FROM orders
       WHERE status = 'cancelled'`
    );

    res.json({
      success: true,

      stats: {
        totalOrders: Number(orders.totalOrders),
        totalRevenue: Number(revenue.totalRevenue),
        totalRestaurants: Number(
          restaurants.totalRestaurants
        ),
        totalUsers: Number(users.totalUsers),

        deliveredRevenue: Number(
          deliveredRevenue.deliveredRevenue
        ),

        activeRevenue: Number(
          activeRevenue.activeRevenue
        ),

        cancelledRevenue: Number(
          cancelledRevenue.cancelledRevenue
        ),
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboardStats,
};