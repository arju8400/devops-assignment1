const express = require('express');
const router = express.Router();

// QFD-22: Real-time order tracking
const trackingStages = ['PREPARING', 'PICKED_UP', 'ON_THE_WAY', 'DELIVERED'];

router.get('/:orderId', (req, res) => {
  // Mock: derive a pseudo-stage from the order id for demo purposes
  const stage = trackingStages[Number(req.params.orderId) % trackingStages.length];
  res.json({ orderId: req.params.orderId, stage, riderLocation: { lat: 19.076, lng: 72.8777 } });
});

module.exports = router;
