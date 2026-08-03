const express = require('express');
const router = express.Router();

// Placeholder - implemented on feature/user-account-management
router.get('/ping', (req, res) => res.json({ pong: true }));

module.exports = router;
