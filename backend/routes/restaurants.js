const express = require('express');
const router = express.Router();
const { restaurants } = require('../data/mockData');

// Seed a little mock data for the demo
if (restaurants.length === 0) {
  restaurants.push(
    { id: 1, name: 'Spice Villa', cuisine: 'Indian', rating: 4.5, deliveryTimeMin: 25, priceLevel: 2 },
    { id: 2, name: 'Pasta Palace', cuisine: 'Italian', rating: 4.2, deliveryTimeMin: 35, priceLevel: 3 },
    { id: 3, name: 'Sushi Central', cuisine: 'Japanese', rating: 4.7, deliveryTimeMin: 40, priceLevel: 4 }
  );
}

// QFD-12: Search restaurants by name, cuisine or dish
router.get('/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (q.length < 2) return res.json([]);
  const results = restaurants.filter(
    r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)
  );
  res.json(results);
});

// QFD-13: Filter and sort restaurants by rating, delivery time and price
router.get('/', (req, res) => {
  let list = [...restaurants];
  const { minRating, maxDeliveryTime, sortBy } = req.query;
  if (minRating) list = list.filter(r => r.rating >= Number(minRating));
  if (maxDeliveryTime) list = list.filter(r => r.deliveryTimeMin <= Number(maxDeliveryTime));
  if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
  if (sortBy === 'deliveryTime') list.sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin);
  if (sortBy === 'price') list.sort((a, b) => a.priceLevel - b.priceLevel);
  res.json(list);
});

module.exports = router;
