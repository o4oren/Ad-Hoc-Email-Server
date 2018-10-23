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
const smtp = require('./smtp');
let server;


beforeAll((done) => {
  mongoDb.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
    assert.equal(null, err);
    logger.info('Connected successfully to mongodb server');
    // creating indexes
    const db = client.db(properties.dbName);
    db.collection('mailboxes').createIndex( {'name': 1}, { unique: true } );
    db.collection('tokens').createIndex( {'ip': 1}, { unique: true } );

    const serverApp = require('./serverApp')(db);
    /**
     * Create HTTP server.
     */
    server = http.createServer(serverApp);
    const port = process.env.PORT || properties.appListenPort || '3000';

    /**
     * Listen on provided port, on all network interfaces.
     */
    smtp.startSTMPServer(properties, baseDir, db, logger);

    server.listen(port, function () {
      logger.info('API server listening');
    });

  });
});

afterAll((done) => {
  server.close();
  done();
});
  describe('alive API', () => {
  // jest.setTimeout(30000)
  test('GET /api/alive', done => {

    function callback(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    }

    request.get(properties.serverBaseUri + '/api/alive', callback);

  });
});



