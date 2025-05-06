const Category = require('../models/categoryModel');

exports.getAll = async (req, res) => {
  const result = await Category.getAll();
  res.json(result.rows);
};

exports.getById = async (req, res) => {
  const result = await Category.getById(req.params.id);
  res.json(result.rows[0]);
};

exports.create = async (req, res) => {
  const result = await Category.create(req.body.name);
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const result = await Category.update(req.params.id, req.body.name);
  res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
  if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Forbidden: Invalid admin password' });
  }
  await Category.delete(req.params.id);
  res.json({ message: 'Category deleted' });
};
exports.getAll = async (req, res) => {
  try {
    const result = await Category.getAll();
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories' });
  }
};
