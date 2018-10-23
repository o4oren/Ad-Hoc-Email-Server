require ('jest');
const assert = require('assert');
const logger =require('./logger');
const fs = require('fs');
const path = require('path');
const http = require('http');
const baseDir = process.cwd();
const mongoDb = require('mongodb');
const request = require('request');
const properties = require('../../properties.json');
let server;
let smtp;
let mongoClient;

beforeAll(done => {
  mongoDb.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
    assert.ok(client !== null, err);
    logger.info('Connected successfully to mongodb server');
    // creating indexes
    mongoClient = client;
    const db = client.db(properties.dbName);
    db.collection('mailboxes').createIndex( {'name': 1}, { unique: true } );
    db.collection('tokens').createIndex( {'ip': 1}, { unique: true } );

    const serverApp = require('./serverapp')(db);
    /**
     * Create HTTP server.
     */
    server = http.createServer(serverApp);
    const port = process.env.PORT || properties.appListenPort || '3000';

    /**
     * Listen on provided port, on all network interfaces.
     */
    smtp = require('./smtp')(properties, baseDir, db, logger);

    server.listen(port, async () => {
      logger.info('API server listening');
    });
    done();
  });

});

afterAll(done => {
  smtp.close(() => logger.info('SMTP Server closed!'));
  mongoClient.close(true, () => logger.info('Mongo client closed!'));
  server.close(() => logger.info('appServer stops listening'));
  done();
});


  describe('properties API', () => {
  // jest.setTimeout(30000)
  test('GET /api/properties', done => {

    function callback(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    }
    request.get(properties.serverBaseUri + '/api/properties', callback);
  });
});

describe('alive API', () => {
  // jest.setTimeout(30000)
  test('GET /api/alive', done => {
    function callback(error, response, body) {
      logger.info(body)
      expect(response.statusCode).toBe(200);
      done();
    }
    request.get(properties.serverBaseUri + '/api/alive', callback);
  });

  test('Check that without token we get 401', done => {
    function callback(error, response, body) {
      logger.info(body)
      expect(response.statusCode).toBe(401);
      done();
    }
    request.get(properties.serverBaseUri + '/api/mailbox/test-alive', callback);
  });

  test('Check mail', done => {
    function callback(error, response, body) {
      logger.info(body)
      expect(response.statusCode).not.toBe(401);
      expect(response.statusCode).not.toBe(500);
      done();
    }


    request.post(properties.serverBaseUri + '/api/auth/token', {}, (error, response, body) => {
      const token = JSON.parse(body).token;
      let options = {
        url: properties.serverBaseUri + '/api/mailbox/alive-test/email',
        headers: {"Authorization": "Bearer " + token}
    }
      request.get(options, callback);
    });

  });

});





