const request = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  let userId;

  test('POST /api/auth/register rejects invalid mobile', async () => {
    const res = await request(app).post('/api/auth/register').send({ mobile: '123' });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/auth/register creates a pending user', async () => {
    const res = await request(app).post('/api/auth/register').send({ mobile: '9876543210' });
    expect(res.statusCode).toBe(201);
    userId = res.body.userId;
    expect(userId).toBeDefined();
  });

  test('POST /api/auth/register rejects duplicate mobile', async () => {
    const res = await request(app).post('/api/auth/register').send({ mobile: '9876543210' });
    expect(res.statusCode).toBe(409);
  });
});
