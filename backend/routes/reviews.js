const express = require('express');
const router = express.Router();

const reviews = [];

// QFD-26: Rate and review the restaurant/delivery experience
router.post('/', (req, res) => {
  const { orderId, userId, restaurantId, rating, comment } = req.body;
  if (rating < 1 || rating > 5) return res.status(400).json({ error: 'Rating must be 1-5' });
  if (reviews.find(r => r.orderId === orderId)) {
    return res.status(409).json({ error: 'A review already exists for this order' });
  }
  const review = { id: reviews.length + 1, orderId, userId, restaurantId, rating, comment, reply: null, flagged: false };
  reviews.push(review);
  res.status(201).json(review);
});

module.exports = router;
