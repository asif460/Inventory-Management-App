const pool = require('./db');

const Item = {
  getAllByCategory: (categoryId) =>
    pool.query('SELECT * FROM items WHERE category_id = $1', [categoryId]),
  getById: (id) => pool.query('SELECT * FROM items WHERE id = $1', [id]),
  create: (name, quantity, categoryId) =>
    pool.query(
      'INSERT INTO items (name, quantity, category_id) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, categoryId]
    ),
  update: (id, name, quantity) =>
    pool.query(
      'UPDATE items SET name = $1, quantity = $2 WHERE id = $3 RETURNING *',
      [name, quantity, id]
    ),
  delete: (id) => pool.query('DELETE FROM items WHERE id = $1', [id]),
};

module.exports = Item;
