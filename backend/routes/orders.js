const express = require('express');
const router = express.Router();

const orders = [];

// QFD-18: Review order summary before placing
router.post('/', (req, res) => {
  const { userId, items, addressId, discount } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = 30;
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal - (discount || 0) + deliveryFee + tax).toFixed(2));
  const order = { id: orders.length + 1, userId, items, addressId, subtotal, deliveryFee, tax, total, status: 'REVIEW' };
  orders.push(order);
  res.status(201).json(order);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === Number(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

module.exports = router;
