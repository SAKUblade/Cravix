const db = require("../config/db");

// ===============================
// Place Order
// ===============================
const placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;

    const {
      restaurant_id,
      order_type,
      subtotal,
      delivery_fee,
      total_amount,
      delivery_address,
      customer_note,
      items,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    const [orderResult] = await db.execute(
      `
      INSERT INTO orders
      (
        user_id,
        restaurant_id,
        order_type,
        subtotal,
        delivery_fee,
        total_amount,
        delivery_address,
        customer_note
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        user_id,
        restaurant_id,
        order_type,
        subtotal,
        delivery_fee,
        total_amount,
        delivery_address,
        customer_note,
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await db.execute(
        `
        INSERT INTO order_items
        (
          order_id,
          menu_item_id,
          item_name,
          unit_price,
          quantity,
          subtotal
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.menu_item_id,
          item.item_name,
          item.unit_price,
          item.quantity,
          item.subtotal,
        ]
      );
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId,
    });
  } catch (err) {
    console.error("Place order error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};


// ===============================
// Get All Orders - ADMIN
// ===============================
const getOrders = async (req, res) => {
  try {
    const [orders] = await db.execute(`
      SELECT
        o.id,
        o.user_id,
        o.restaurant_id,
        r.name AS restaurant_name,
        o.order_type,
        o.subtotal,
        o.delivery_fee,
        o.total_amount,
        o.status,
        o.delivery_address,
        o.customer_note,
        o.created_at
      FROM orders o
      JOIN restaurants r
        ON o.restaurant_id = r.id
      ORDER BY o.created_at DESC
    `);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.error("Get all orders error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};


// ===============================
// Get Orders By User
// ===============================
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const [orders] = await db.execute(
      `
      SELECT
        o.id,
        o.user_id,
        o.restaurant_id,
        r.name AS restaurant_name,
        o.order_type,
        o.status,
        o.subtotal,
        o.delivery_fee,
        o.total_amount,
        o.delivery_address,
        o.customer_note,
        o.created_at
      FROM orders o
      JOIN restaurants r
        ON o.restaurant_id = r.id
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
      `,
      [userId]
    );

    // Get items for every order
    for (const order of orders) {
      const [items] = await db.execute(
        `
        SELECT
          id,
          menu_item_id,
          item_name,
          quantity,
          unit_price,
          subtotal
        FROM order_items
        WHERE order_id = ?
        `,
        [order.id]
      );

      order.items = items;
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    console.error("Get user orders error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};


// ===============================
// Update Order Status - ADMIN
// ===============================
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "accepted",
      "preparing",
      "ready",
      "out for delivery",
      "delivered",
      "cancelled",
    ];

    const normalizedStatus =
      status?.toLowerCase();

    if (
      !normalizedStatus ||
      !allowedStatuses.includes(normalizedStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [normalizedStatus, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (err) {
    console.error(
      "Update order status error:",
      err
    );

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};


// ===============================
// Get Single Order - CUSTOMER
// ===============================
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    // ==========================================
    // GET ORDER
    // Only the owner can access this order
    // ==========================================

    const [orders] = await db.execute(
      `
      SELECT
        o.id,
        o.user_id,
        o.restaurant_id,
        r.name AS restaurant_name,
        o.order_type,
        o.subtotal,
        o.delivery_fee,
        o.total_amount,
        o.status,
        o.delivery_address,
        o.customer_note,
        o.created_at
      FROM orders o
      JOIN restaurants r
        ON o.restaurant_id = r.id
      WHERE o.id = ?
        AND o.user_id = ?
      `,
      [id, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ==========================================
    // GET ORDER ITEMS
    // ==========================================

    const [items] = await db.execute(
      `
      SELECT
        id,
        order_id,
        menu_item_id,
        item_name,
        unit_price,
        quantity,
        subtotal
      FROM order_items
      WHERE order_id = ?
      ORDER BY id ASC
      `,
      [id]
    );

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(200).json({
      success: true,
      order: orders[0],
      items,
    });
  } catch (err) {
    console.error(
      "Get order by ID error:",
      err
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};


// ===============================
// EXPORTS
// ===============================

module.exports = {
  placeOrder,
  getOrders,
  getUserOrders,
  updateOrderStatus,
  getOrderById,
};