const pool = require('./db');

const Category = {
  getAll: () => pool.query('SELECT * FROM categories'),
  getById: (id) => pool.query('SELECT * FROM categories WHERE id = $1', [id]),
  create: (name) => pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]),
  update: (id, name) => pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, id]),
  delete: (id) => pool.query('DELETE FROM categories WHERE id = $1', [id]),
};

module.exports = Category;
