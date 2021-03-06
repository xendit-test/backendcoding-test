# backendcoding-test

# Ride
[![Build Status](https://secure.travis-ci.org/diowa/icare.svg?branch=master)](https://github.com/xendit-test/backendcoding-test/runs/321240339)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://github.com/xendit-test/backendcoding-test/runs/321240339)

**Ride** is an open source [carpooling](https://en.wikipedia.org/wiki/Carpool) platform

**ride** uses the following technologies:

* [Node JS]

## Logo 
![Image description](https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Taxi_Service-512.png)


## API 

This express app exposes the following endpoints:

- http://localhost:8010/health
- http://localhost:8010/

## Record limits

* If no limit is specified, return results with a default limit.
* To get records 51 through 75 do this:
    * http://localhost:8010/rides?limit=25&offset=50
    * offset=50 means, ‘skip the first 50 records’
    * limit=25 means, ‘return a maximum of 25 records’

Information about record limits and total available count should also be included in the response. Example:

    {
        "metadata": {
            "resultset": {
                "count": 227,
                "offset": 25,
                "limit": 25
            }
        },
        "results": []
    }

## Request & Response Examples

### API Resources

  - [GET /rides](#get-rides)
  - [GET /rides/[id]](#get-rideid)
  - [POST /rides/](#post-rides)

### GET /rides

Example: http://localhost:8010/rides

Request body: 

    {
    	"start" : 0,
    	"limit": 10
    }

Response body:

    {
        "start_lat" : 30,
        	"start_long": 60,
        	"end_lat" : 70,
        	"end_long" : 100,
        	"rider_name" : "rajesh",
        	"driver_name" : "john",
        	"driver_vehicle": "toyota"
    }

### GET /rides/[id]

Example: http://localhost:8081/[id]

Response body:

    {
            "start_lat" : 30,
        	"start_long": 60,
        	"end_lat" : 70,
        	"end_long" : 100,
        	"rider_name" : "rajesh",
        	"driver_name" : "john",
        	"driver_vehicle": "toyota"
    }



### POST /posts/

Example: Create – POST  http://localhost:8081/

Request body:

    {
    	"start_lat" : 30,
    	"start_long": 60,
    	"end_lat" : 70,
    	"end_long" : 100,
    	"rider_name" : "rajesh",
    	"driver_name" : "john",
    	"driver_vehicle": "toyota"
    }


### Prerequisites

Ensure `node (>8.6 and <= 10)` and `npm` are installed

## Configuration

Config for different environments can be done found in the `config` directory. By default, there are three config files:

- development.js
- test.js
- production.js

The appropriate config file for your environment is then decided by looking at the `NODE_ENV` environment variable and read in by having the following line in your main `app.js`:

```js
const config = require('./config');
```

### Unit Tests
Tests for all individual chunks of logic. Dependencies mocked with jest. These tests should be fast to run. Unit tests have the suffix `.test.js`.

### Integration Tests
Tests around each external service with calls stubbed with nock. Integration tests have the suffix `.int.test.js`. These use nock fixtures that live in `app/tests/fixtures`. Delete a fixture to regenerate it on the next test run.

### Building
 1. Run `npm install`
 2. Run `npm test`
 3. Run `npm start`


#### Commands
All npm commands can be run inside the docker container started by docker-compose by prefixing them with `docker exec dbook-finder`

- `npm run lint`: Lints client and app javascript.  
- `npm run dev:client`: Proxies through to the `backpack-react-scripts` dev cli -
  use this for client side react development. Needs to be run in the background for local dev outwith Docker.
- `npm run dev:app`: Runs the express app for development purposes, any file changes
  automatically restart the server. Run by docker compose to start the server for local dev.
- `npm run build`: Bundles the client side react app into productionised css & js
  bundles, ready to be consumed by the express server.
- `npm test`: Runs client and app tests. You can also run `npm run test:client`
  or `npm run test:app` to target each one individually.
  Use `npm run test:app -- --watch` and `cd ./client && npm test` to run app and client tests in watch mode.
  If running inside docker explicitly set the `NODE_ENV` env var to `test` using the `-e` flag eg. `docker exec -e NODE_ENV=test dbook-finder npm test`
- `npm run test:e2e:local:chrome`: Runs the chrome e2e tests.
- `npm run test:e2e:local:firefox`: Runs the firefox e2e tests.
- `npm run test:e2e:remote`: Will test the full app remotely on browserstack with all external calls stubbed. If you made intentional changes to the app which needs new external calls to be stubbed, just remove `test.json` and this command will regenerate it again.
- `npm run coverage`: Runs client and app tests with coverage report. Report is displayed in the screen
  and stored in client and app `coverage` folders in html and lcov format. You can also run `npm run coverage:client`
  or `npm run coverage:app` to target each one individually.
- `npm start`: the command that the dockerfile uses to run the app in production.
- `npm start:client`: Runs the webpack dev server that serves static files.

# Running Load test

First you need artillery installed 

`npm install -g artillery`

and you can start the load test with

`artillery run -e [environment] artillery.yml`

## Contributing

Email: Raj Gannamaneni
