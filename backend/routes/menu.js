const express = require('express');
const router = express.Router();

// Mock menu data keyed by restaurant id
const menus = {
  1: [{ id: 101, name: 'Paneer Butter Masala', price: 220, veg: true, available: true }],
  2: [{ id: 201, name: 'Spaghetti Carbonara', price: 280, veg: false, available: true }],
  3: [{ id: 301, name: 'Salmon Nigiri (6pc)', price: 350, veg: false, available: false }],
};

// QFD-14: View restaurant menu with prices, photos and customization
router.get('/:restaurantId', (req, res) => {
  const items = menus[req.params.restaurantId];
  if (!items) return res.status(404).json({ error: 'Restaurant not found' });
  res.json(items);
});

module.exports = router;
