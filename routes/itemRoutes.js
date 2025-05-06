const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// PostgreSQL config
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'kashif',       // ✅ use your actual DB name
  password: 'aseef123', // ❗️ replace with your real password
  port: 5432,
});

client.connect();

// GET all items
router.get('/', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM items'); // assumes you have an `items` table
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

module.exports = router;
