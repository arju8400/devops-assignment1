const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'quickbite-api' }));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const restaurantRoutes = require('./routes/restaurants');
app.use('/api/restaurants', restaurantRoutes);
const menuRoutes = require('./routes/menu');
app.use('/api/menu', menuRoutes);
const cartRoutes = require('./routes/cart');
app.use('/api/cart', cartRoutes);
const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);
const paymentRoutes = require('./routes/payments');
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`QuickBite API running on port ${PORT}`));
}

module.exports = app;
