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

// QFD-27: Restaurant owner responds to a review
router.post('/:id/reply', (req, res) => {
  const review = reviews.find(r => r.id === Number(req.params.id));
  if (!review) return res.status(404).json({ error: 'Review not found' });
  review.reply = req.body.reply;
  res.json(review);
});

// Owners can flag abusive reviews for admin moderation
router.post('/:id/flag', (req, res) => {
  const review = reviews.find(r => r.id === Number(req.params.id));
  if (!review) return res.status(404).json({ error: 'Review not found' });
  review.flagged = true;
  res.json(review);
});

module.exports = router;
