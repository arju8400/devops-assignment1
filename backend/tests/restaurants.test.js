const request = require('supertest');
const app = require('../server');

describe('Restaurants API', () => {
  test('GET /api/restaurants/search returns [] for short queries', async () => {
    const res = await request(app).get('/api/restaurants/search?q=a');
    expect(res.body).toEqual([]);
  });

  test('GET /api/restaurants supports minRating filter', async () => {
    const res = await request(app).get('/api/restaurants?minRating=4.5');
    expect(res.statusCode).toBe(200);
    res.body.forEach(r => expect(r.rating).toBeGreaterThanOrEqual(4.5));
  });
});
