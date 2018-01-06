### **Exchange Rate**

A service that gives the latest and historical exchange rate for the currency.

https://exchange-rate-client.herokuapp.com/

### ***Solutions***

##### Front-end

A React Web Application for searching the latest and historical exchange rate.

- Search rate by base currency
- Filter target currency
- Search rate with historical date

https://exchange-rate-client.herokuapp.com/

##### Back-end

A Clustered Express APIs for fetching data from Open Exchange Rate API.

https://exchange-rate-server.herokuapp.com/

### ***APIs***

##### Currency

Get list of currencies.

```
GET /currency
```

##### Rate

Get latest rate

```
GET /rate/latest
```

| Field | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| base  | string | Base currency (default: USD) |

Get historical rate

```
GET /rate/historical/:date
```

| Field | Type   | Description                  |
| ----- | ------ | ---------------------------- |
| date  | string | Date of Rate (YYYY-MM-DD)    |
| base  | string | Base currency (default: USD) |

### ***Architecture***

React Web Application on Heroku <---> Clustered Node.js API on Heroku <---> Open Exchange Rate API

### ***Technical Used***

##### Front-end

| Framework | Reason                                                            |
| --------- | ----------------------------------------------------------------- |
| react     | Famous framework to create interactive UIs with a large community |

##### Back-end

| Framework | Reason                                                            |
| --------- | ----------------------------------------------------------------- |
| express   | Fast and Simple framework to build web                            |
| throng    | Clustered Node.js apps in Heroku                                  |
| jest      | Latest JavaScript testing framework with a large community        |
| supertest | HTTP assertions made easy with jest                               |

### ***Testing***

- Use Jest and Supertest to describe the test and defined the expected result
- Use Travis CI to trigger the test when post-received
- Will run tests under /server/tests/ directory

```
cd server
npm test
```

### ***TODO***

- [ ] Caching
- [ ] Notification when data update
