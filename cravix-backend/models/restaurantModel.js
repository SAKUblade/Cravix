const db = require("../config/db");

// Get all restaurants
// Get all active restaurants
const getAllRestaurants = async () => {
  const [rows] = await db.query(`
    SELECT
      r.*,
      GROUP_CONCAT(
        DISTINCT m.name
        ORDER BY m.name
        SEPARATOR ','
      ) AS menu_items
    FROM restaurants r
    LEFT JOIN menu_items m
      ON r.id = m.restaurant_id
      AND m.is_available = 1
    WHERE r.is_active = 1
    GROUP BY r.id
    ORDER BY r.id DESC
  `);

  return rows;
};

// Get single restaurant
const getRestaurantById = async (id) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM restaurants
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

// Get restaurant menu
const getRestaurantMenu = async (restaurantId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM menu_items
    WHERE restaurant_id = ?
      AND is_available = 1
    ORDER BY category, name
    `,
    [restaurantId]
  );

  return rows;
};

// Search food items
const searchFood = async (search) => {
  const [rows] = await db.query(
    `
    SELECT
      menu_items.id,
      menu_items.name,
      menu_items.category,
      menu_items.price,
      menu_items.image_url,
      restaurants.id AS restaurant_id,
      restaurants.name AS restaurant_name
    FROM menu_items
    INNER JOIN restaurants
      ON menu_items.restaurant_id = restaurants.id
    WHERE
      menu_items.is_available = 1
      AND (
        menu_items.name LIKE ?
        OR menu_items.category LIKE ?
      )
    ORDER BY menu_items.name
    LIMIT 8
    `,
    [`%${search}%`, `%${search}%`]
  );

  return rows;
};

// Create restaurant
const createRestaurant = async (restaurant) => {
  const {
    name,
    description,
    image_url,
    address,
    category,
  } = restaurant;

  const [result] = await db.query(
    `
    INSERT INTO restaurants
    (
      name,
      description,
      image_url,
      address,
      category
    )
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      name,
      description,
      image_url,
      address,
      category,
    ]
  );

  return result.insertId;
};

// Remove restaurant safely
const deleteRestaurant = async (id) => {
  const [result] = await db.query(
    `
    UPDATE restaurants
    SET is_active = 0
    WHERE id = ?
      AND is_active = 1
    `,
    [id]
  );

  return result.affectedRows > 0;
};

// Get recommended food
const getRecommendedFood = async () => {
  const [rows] = await db.query(`
    SELECT
      menu_items.*,
      restaurants.name AS restaurant_name
    FROM menu_items
    INNER JOIN restaurants
      ON menu_items.restaurant_id = restaurants.id
    WHERE menu_items.is_available = 1
    ORDER BY RAND()
    LIMIT 8
  `);

  return rows;
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantMenu,
  searchFood,
  getRecommendedFood,
  createRestaurant,
  deleteRestaurant,
};