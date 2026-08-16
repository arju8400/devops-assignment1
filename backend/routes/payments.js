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

// QFD-20: Generate invoice on successful payment
router.get('/:id/invoice', (req, res) => {
  const payment = payments.find(p => p.id === Number(req.params.id));
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  if (payment.status !== 'SUCCESS' && payment.status !== 'PENDING_ON_DELIVERY') {
    return res.status(409).json({ error: 'Payment not completed yet' });
  }
  payment.invoiceId = `INV-${1000 + payment.id}`;
  res.json({ invoiceId: payment.invoiceId, orderId: payment.orderId, amount: payment.amount, method: payment.method });
});

module.exports = router;
