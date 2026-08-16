const express = require('express');
const router = express.Router();

const payments = [];
const VALID_METHODS = ['UPI', 'CARD', 'WALLET', 'COD'];

// QFD-19: Pay via UPI/card/wallet/COD
router.post('/', (req, res) => {
  const { orderId, method, amount } = req.body;
  if (!VALID_METHODS.includes(method)) {
    return res.status(400).json({ error: `method must be one of ${VALID_METHODS.join(', ')}` });
  }
  // COD skips the payment gateway entirely
  const status = method === 'COD' ? 'PENDING_ON_DELIVERY' : 'SUCCESS';
  const payment = { id: payments.length + 1, orderId, method, amount, status, invoiceId: null };
  payments.push(payment);
  res.status(201).json(payment);
});

module.exports = router;
