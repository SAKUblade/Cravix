const db = require("../config/db");

// Get all menu items
const getAllMenuItems = async () => {
  const [rows] = await db.query(`
    SELECT
      m.*,
      r.name AS restaurant_name
    FROM menu_items m
    INNER JOIN restaurants r
      ON m.restaurant_id = r.id
    WHERE r.is_active = 1
    ORDER BY m.id DESC
  `);

  return rows;
};

// Get menu items for one restaurant
const getMenuItemsByRestaurant = async (restaurantId) => {
  const [rows] = await db.query(
    `
    SELECT
      m.*,
      r.name AS restaurant_name
    FROM menu_items m
    INNER JOIN restaurants r
      ON m.restaurant_id = r.id
    WHERE m.restaurant_id = ?
    ORDER BY m.category, m.name
    `,
    [restaurantId]
  );

  return rows;
};

// Get single menu item
const getMenuItemById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT
      m.*,
      r.name AS restaurant_name
    FROM menu_items m
    INNER JOIN restaurants r
      ON m.restaurant_id = r.id
    WHERE m.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Create menu item
const createMenuItem = async (menuItem) => {
  const {
    restaurant_id,
    name,
    description,
    price,
    category,
    image_url,
    is_available = 1,
  } = menuItem;

  const [result] = await db.query(
    `
    INSERT INTO menu_items
    (
      restaurant_id,
      name,
      description,
      price,
      category,
      image_url,
      is_available
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      restaurant_id,
      name,
      description,
      price,
      category,
      image_url,
      is_available,
    ]
  );

  return result.insertId;
};

// Update menu item
const updateMenuItem = async (id, menuItem) => {
  const {
    restaurant_id,
    name,
    description,
    price,
    category,
    image_url,
    is_available,
  } = menuItem;

  const [result] = await db.query(
    `
    UPDATE menu_items
    SET
      restaurant_id = ?,
      name = ?,
      description = ?,
      price = ?,
      category = ?,
      image_url = ?,
      is_available = ?
    WHERE id = ?
    `,
    [
      restaurant_id,
      name,
      description,
      price,
      category,
      image_url,
      is_available,
      id,
    ]
  );

  return result.affectedRows > 0;
};

// Delete menu item
const deleteMenuItem = async (id) => {
  const [result] = await db.query(
    `
    DELETE FROM menu_items
    WHERE id = ?
    `,
    [id]
  );

  return result.affectedRows > 0;
};

// Toggle menu item availability
const toggleMenuItemAvailability = async (id) => {
  const [result] = await db.query(
    `
    UPDATE menu_items
    SET is_available = NOT is_available
    WHERE id = ?
    `,
    [id]
  );

  return result.affectedRows > 0;
};

module.exports = {
  getAllMenuItems,
  getMenuItemsByRestaurant,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
};