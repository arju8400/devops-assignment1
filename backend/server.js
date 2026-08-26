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
const trackingRoutes = require('./routes/tracking');
app.use('/api/tracking', trackingRoutes);
const notificationRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationRoutes);
const deliveryRoutes = require('./routes/delivery');
app.use('/api/delivery', deliveryRoutes);
const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`QuickBite API running on port ${PORT}`));
}

module.exports = app;
