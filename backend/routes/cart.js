const express = require('express');
const router = express.Router();

// In-memory cart keyed by userId (mock only)
const carts = {};

// QFD-16: Add/remove cart items
router.post('/:userId/items', (req, res) => {
  const { userId } = req.params;
  const { itemId, name, price, qty } = req.body;
  carts[userId] = carts[userId] || [];
  const existing = carts[userId].find(i => i.itemId === itemId);
  if (existing) existing.qty += qty;
  else carts[userId].push({ itemId, name, price, qty });
  res.status(201).json(carts[userId]);
});

router.delete('/:userId/items/:itemId', (req, res) => {
  const { userId, itemId } = req.params;
  carts[userId] = (carts[userId] || []).filter(i => String(i.itemId) !== itemId);
  res.json(carts[userId] || []);
});

router.get('/:userId', (req, res) => res.json(carts[req.params.userId] || []));

module.exports = router;
