const request = require('supertest');
const app = require('../src/app')

const root = '/rate';

describe('Test /rate/latest', () => {

  const path = '/latest';

  test('Expect return latest rate', () => {
    return request(app).get(`${root}${path}`).then(response => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body).length > 0);
      expect(response.body.USD === 1);
    })
  });

  test('Expect return USD base', () => {
    return request(app).get(`${root}${path}?base=USD`).then(response => {
      expect(response.statusCode).toBe(200);
      expect(Object.keys(response.body).length > 0);
      expect(response.body.USD === 1);
    })
  });

})

describe('Test /rate/historical', () => {

  const path = '/historical';

  test('Expect return historical date', () => {
    return request(app).get(`${root}${path}/2018-01-01`).then(response => {
        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body).length > 0);
        expect(response.body.USD === 1);
        expect(response.body.AED === 3.672896);
    })
  });

  test('Expect return error in date of 2018', () => {
    return request(app).get(`${root}${path}/2018`).then(response => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
          message: 'Invalid date - 2018'
        });
    })
  });

  test('Expect return error in date of a', () => {
    return request(app).get(`${root}${path}/a`).then(response => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
          message: 'Invalid date - a'
        });
    })
  });

  test('Expect return error in date of furture', () => {
    return request(app).get(`${root}${path}/2018-12-31`).then(response => {
      console.log(response.body);
        expect(response.statusCode).toBe(500);
        expect(response.body).toEqual({
          message: 'Request failed with status code 400'
        });
    })
  });

  test('Expect return not found in empty date', () => {
    return request(app).get(`${root}${path}`).then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
          message: 'Not Found'
        });
    })
  });

})
