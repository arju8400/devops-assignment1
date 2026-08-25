const express = require('express');
const router = express.Router();

const menuItems = [];
const restaurantApplications = [];

// QFD-28: Manage menu items (add/edit/remove/toggle availability)
router.post('/menu-items', (req, res) => {
  const item = { id: menuItems.length + 1, ...req.body, available: true };
  menuItems.push(item);
  res.status(201).json(item);
});

router.patch('/menu-items/:id', (req, res) => {
  const item = menuItems.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  Object.assign(item, req.body);
  res.json(item);
});

// QFD-29: Sales and performance dashboard
router.get('/analytics', (req, res) => {
  res.json({
    totalOrders: 1245,
    revenue: 386250.5,
    avgDeliveryTimeMin: 32,
    topRestaurants: ['Spice Villa', 'Sushi Central', 'Pasta Palace'],
  });
});

// QFD-30: Onboard/approve new restaurants
router.post('/restaurant-applications', (req, res) => {
  const application = { id: restaurantApplications.length + 1, ...req.body, status: 'PENDING' };
  restaurantApplications.push(application);
  res.status(201).json(application);
});

router.patch('/restaurant-applications/:id', (req, res) => {
  const app = restaurantApplications.find(a => a.id === Number(req.params.id));
  if (!app) return res.status(404).json({ error: 'Application not found' });
  const { decision, reason } = req.body; // decision: 'APPROVED' | 'REJECTED'
  app.status = decision;
  app.reason = reason || null;
  res.json(app);
});

module.exports = router;
