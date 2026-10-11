const db = require("../config/db");

const User = {
  create: async (userData) => {
    const { name, email, password, phone, role } = userData;

    const sql = `
      INSERT INTO users (name, email, password, phone, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      name,
      email,
      password,
      phone || null,
      role || "customer",
    ]);

    return result;
  },

  findByEmail: async (email) => {
    const sql = `
      SELECT id, name, email, password, phone, role, created_at, updated_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `;

    const [rows] = await db.query(sql, [email]);

    return rows;
  },

  findById: async (id) => {
    const sql = `
      SELECT id, name, email, phone, role, created_at, updated_at
      FROM users
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] = await db.query(sql, [id]);

    return rows;
  },
};

module.exports = User;