const express = require('express');
const router = express.Router();

const sentNotifications = [];

// QFD-23: Push notifications for order status changes
router.post('/send', (req, res) => {
  const { userId, orderId, message } = req.body;
  const notification = { id: sentNotifications.length + 1, userId, orderId, message, sentAt: new Date().toISOString() };
  sentNotifications.push(notification);
  res.status(201).json(notification);
});

router.get('/user/:userId', (req, res) => {
  res.json(sentNotifications.filter(n => String(n.userId) === req.params.userId));
});

module.exports = router;
