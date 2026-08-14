const request = require('supertest');
const app = require('../server');

describe('Cart API', () => {
  test('POST /api/cart/:userId/items adds an item', async () => {
    const res = await request(app)
      .post('/api/cart/1/items')
      .send({ itemId: 101, name: 'Paneer Butter Masala', price: 220, qty: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body[0].qty).toBe(2);
  });

  test('POST /api/cart/:userId/coupon rejects invalid code', async () => {
    const res = await request(app).post('/api/cart/1/coupon').send({ code: 'BOGUS' });
    expect(res.statusCode).toBe(400);
  });
});
