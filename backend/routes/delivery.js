const express = require('express');
const router = express.Router();

const assignments = [];

// QFD-24: Accept/reject delivery request
router.post('/:orderId/respond', (req, res) => {
  const { orderId } = req.params;
  const { agentId, accept } = req.body;
  const assignment = { orderId, agentId, status: accept ? 'ACCEPTED' : 'REJECTED' };
  assignments.push(assignment);
  res.json(assignment);
});

// QFD-25: Update pickup/delivery status
router.patch('/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { status, proof } = req.body;
  if (status === 'DELIVERED' && !proof) {
    return res.status(400).json({ error: 'Delivered status requires OTP or photo proof' });
  }
  const assignment = assignments.find(a => a.orderId === orderId);
  if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
  assignment.status = status;
  res.json(assignment);
});

module.exports = router;
