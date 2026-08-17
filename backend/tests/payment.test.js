const request = require('supertest');
const app = require('../server');

describe('Payments API', () => {
  test('rejects an unsupported payment method', async () => {
    const res = await request(app).post('/api/payments').send({ orderId: 1, method: 'CRYPTO', amount: 100 });
    expect(res.statusCode).toBe(400);
  });

  test('COD orders skip the gateway and stay PENDING_ON_DELIVERY', async () => {
    const res = await request(app).post('/api/payments').send({ orderId: 1, method: 'COD', amount: 100 });
    expect(res.body.status).toBe('PENDING_ON_DELIVERY');
  });
});
