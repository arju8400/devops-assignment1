const express = require('express');
const router = express.Router();
const { users } = require('../data/mockData');

// QFD-9: Register via mobile OTP
router.post('/register', (req, res) => {
  const { mobile } = req.body;
  if (!mobile || !/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ error: 'Valid 10-digit mobile number required' });
  }
  if (users.find(u => u.mobile === mobile)) {
    return res.status(409).json({ error: 'Mobile number already registered' });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const user = { id: users.length + 1, mobile, otp, verified: false, addresses: [] };
  users.push(user);
  res.status(201).json({ message: 'OTP sent', userId: user.id });
});

router.post('/verify-otp', (req, res) => {
  const { userId, otp } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user || user.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  user.verified = true;
  res.json({ message: 'Account verified', userId: user.id });
});

router.get('/ping', (req, res) => res.json({ pong: true }));

module.exports = router;
