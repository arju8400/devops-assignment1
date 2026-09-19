const express = require('express');
const router = express.Router();

// Mock menu data keyed by restaurant id
const menus = {
  1: [
    { id: 101, name: 'Paneer Butter Masala', price: 220, veg: true, available: true },
    { id: 102, name: 'Butter Chicken', price: 260, veg: false, available: true },
    { id: 103, name: 'Dal Makhani', price: 180, veg: true, available: true },
    { id: 104, name: 'Garlic Naan (2pc)', price: 60, veg: true, available: true },
  ],
  2: [
    { id: 201, name: 'Spaghetti Carbonara', price: 280, veg: false, available: true },
    { id: 202, name: 'Margherita Pizza', price: 320, veg: true, available: true },
    { id: 203, name: 'Tiramisu', price: 150, veg: true, available: true },
  ],
  3: [
    { id: 301, name: 'Salmon Nigiri (6pc)', price: 350, veg: false, available: false },
    { id: 302, name: 'California Roll (8pc)', price: 300, veg: false, available: true },
    { id: 303, name: 'Miso Soup', price: 90, veg: true, available: true },
  ],
};

// QFD-14: View restaurant menu with prices, photos and customization
router.get('/:restaurantId', (req, res) => {
  const items = menus[req.params.restaurantId];
  if (!items) return res.status(404).json({ error: 'Restaurant not found' });
  res.json(items);
});

module.exports = router;