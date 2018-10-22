require('jasmine');
const serverApp = require('./serverapp');
const assert = require('assert');
const logger =require('./logger');
const fs = require('fs');
const path = require('path');
const baseDir = process.cwd();
const mongoDb = require('mongodb');
const request = require('request');

const properties = JSON.parse(fs.readFileSync(path.join(baseDir, 'properties.json')));
mongoDb.MongoClient.connect(properties.mongoConnectUrl, { useNewUrlParser: true }, function (err, client) {
  assert.equal(null, err);
  logger.info('Connected successfully to mongodb server');
  // creating indexes
  const db = client.db(properties.dbName);
  db.collection('mailboxes').createIndex({'name': 1}, {unique: true});
  db.collection('tokens').createIndex({'ip': 1}, {unique: true});
  serverApp.startServerApp(properties, db, logger);
});


  describe('GET /api/aline', function() {
    it('returns status code 200', function () {
      request.get(properties.serverBaseUri + '/api/alive', function(error, response, body) {
        console.log(response)
        expect(response.statusCode).toBe(400);
      });
    });
  });


