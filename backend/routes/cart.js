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

const COUPONS = { WELCOME10: 0.10, QUICK20: 0.20 };

// QFD-17: Apply coupon code at checkout
router.post('/:userId/coupon', (req, res) => {
  const { userId } = req.params;
  const { code } = req.body;
  const discount = COUPONS[code];
  if (!discount) return res.status(400).json({ error: 'Invalid or expired coupon code' });
  const items = carts[userId] || [];
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  res.json({ code, discount, subtotal, total: Number((subtotal * (1 - discount)).toFixed(2)) });
});

module.exports = router;
