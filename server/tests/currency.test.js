const request = require('supertest');
const app = require('../src/app')

const root = '/currency';

describe('Test /currency', () => {

  test('Expect return latest rate', () => {
    return request(app).get(`${root}`).then(response => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body).length > 0);
    })
  });

})
