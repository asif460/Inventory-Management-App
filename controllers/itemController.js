const Item = require('../models/itemModel');

exports.getAllByCategory = async (req, res) => {
  const result = await Item.getAllByCategory(req.params.categoryId);
  res.json(result.rows);
};

exports.getById = async (req, res) => {
  const result = await Item.getById(req.params.id);
  res.json(result.rows[0]);
};

exports.create = async (req, res) => {
  const { name, quantity, categoryId } = req.body;
  const result = await Item.create(name, quantity, categoryId);
  res.status(201).json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await Item.update(req.params.id, name, quantity);
  res.json(result.rows[0]);
};

exports.delete = async (req, res) => {
  if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Forbidden: Invalid admin password' });
  }
  await Item.delete(req.params.id);
  res.json({ message: 'Item deleted' });
};
