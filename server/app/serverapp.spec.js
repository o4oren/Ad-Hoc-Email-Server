require('jest');
const assert = require('assert');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const http = require('http');
const baseDir = process.cwd();
const mongoDb = require('mongodb');
const request = require("supertest");
const properties = {
  "serverBaseUri": "http://localhost:3000",
  "mongoConnectUrl": "mongodb://localhost:27017/",
  "dbName": "ahem",
  "appListenPort": 3000,
  "smtpPort" : 2525,
  "emailDeleteInterval" : 3600,
  "emailDeleteAge" : 86400,
  "allowAutocomplete" : true,
  "allowedDomains" : ["my.domain.com"],
  "jwtSecret": "AH3M 709 S3cR3T",
  "jwtExpiresIn": 3600,
  "maxAllowedApiCalls": 10
}
let server;
let serverApp;
let smtp;
let mongoClient;

beforeAll(done => {
  mongoDb.MongoClient.connect(properties.mongoConnectUrl, {useNewUrlParser: true}, function (err, client) {
    assert.ok(client !== null, err);
    logger.info('Connected successfully to mongodb server');
    // creating indexes
    mongoClient = client;
    const db = client.db(properties.dbName);
    db.collection('mailboxes').createIndex({'name': 1}, {unique: true});
    db.collection('tokens').createIndex({'ip': 1}, {unique: true});

    serverApp = require('./serverapp')(properties, db);
    /**
     * Create HTTP server.
     */
    server = http.createServer(serverApp);
    const port = process.env.PORT || properties.appListenPort || '3000';

    /**
     * Listen on provided port, on all network interfaces.
     */
    smtp = require('./smtp')(properties, db);

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
  logger.info('All closed!');
  done();
});


describe('properties API', () => {
  // jest.setTimeout(30000)
  test('GET /api/properties', done => {

    request(server)
      .get('/api/properties')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if(err) {
          done(err);
        }
          expect(res.body.allowAutocomplete).toBe(true);
          done();
      });
  });
});

describe('alive API', () => {
  // jest.setTimeout(30000)
  test('GET /api/alive', (done) => {
    request(server)
      .get('/api/alive')
      .expect(200, done)
  });
});

describe('Token access', () => {
  test('Token access with no token - 401', (done) => {

    request(server)
      .get('/api/mailbox/test-alive')
      .expect(401, done);
  });

  test('Token access with invalid token - 401', (done) => {
    request(server)
      .get('/api/mailbox/test-alive')
      .set('Authentication', 'Bearer stam-token')
      .expect(401, done);
  });

  // test('Token access with invalid token - 401', done => {
  //   function callback(error, response, body) {
  //     expect(response.statusCode).toBe(401);
  //     done();
  //   }
  //
  //   let options = {
  //     url: properties.serverBaseUri + '/api/mailbox/alive-test/email',
  //     headers: {"Authorization": "Bearer " + 'stam token'}
  //   }
  //   request.get(options, callback);
  // });
  // test('Token has predefined max allowed api calls', done => {
  //   request.post(properties.serverBaseUri + '/api/auth/token', {}, (error, response, body) => {
  //     let token = JSON.parse(body).token;
  //     console.log(jwt.decode(token).maxAllowedApiCalls)
  //     expect(jwt.decode(token).maxAllowedApiCalls).toBe(10);
  //     done();
  //   });
  // });

});



// describe('List emails', () => {
//   let emailInfo;
//   let token;
//
//   test('List emails', done => {
//     function callback(error, response, body) {
//       expect(response.statusCode).toBe(200);
//       emailInfo = JSON.parse(body)[0];
//       expect(emailInfo.subject).toBe('AHEM mail test! ✔');
//       done();
//     }
//
//     request.post(properties.serverBaseUri + '/api/auth/token', {}, (error, response, body) => {
//       token = JSON.parse(body).token;
//       let options = {
//         url: properties.serverBaseUri + '/api/mailbox/alive-test/email',
//         headers: {"Authorization": "Bearer " + token}
//       }
//       //wait for mail to arrive
//       setTimeout(() => {
//         request.get(options, callback);
//       }, 1500);
//     });
//   });
//
//   test('Get email details', done => {
//     function callback(error, response, body) {
//       expect(response.statusCode).toBe(200);
//       let email = JSON.parse(body);
//       expect(email.attachments.length).toBe(1);
//       done();
//     }
//     let options = {
//       url: properties.serverBaseUri + '/api/mailbox/alive-test/email/' + emailInfo.emailId,
//       headers: {"Authorization": "Bearer " + token}
//     }
//     request(options, callback);
//   });
// });
//
//
//






