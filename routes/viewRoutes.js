const express = require('express');
const router = express.Router();
const pool = require('../models/db');

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM categories');
  res.render('home', { categories: result.rows });
});

router.get('/categories/:id', async (req, res) => {
  const categoryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
  const itemsResult = await pool.query('SELECT * FROM items WHERE category_id = $1', [req.params.id]);
  res.render('category', {
    category: categoryResult.rows[0],
    items: itemsResult.rows
  });
});

module.exports = router;
