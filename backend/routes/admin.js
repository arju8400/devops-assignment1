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

module.exports = router;
