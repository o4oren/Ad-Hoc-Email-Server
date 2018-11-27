require('jest');
const assert = require('assert');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const http = require('http');
const baseDir = process.cwd();
const mongoDb = require('mongodb');
const {MongoMemoryServer} = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();


const request = require("supertest");
let properties;
let server;
let serverApp;
let smtp;
let mongoClient;
let db;

beforeAll(done => {
  mongoServer.getConnectionString().then((mongoUri) => {
      properties = {
        "serverBaseUri": "http://localhost:3000",
        "mongoConnectUrl": mongoUri,
        "dbName": "ahem",
        "appListenPort": 3000,
        "smtpPort" : 2525,
        "emailDeleteInterval" : 3600,
        "emailDeleteAge" : 86400,
        "allowAutocomplete" : true,
        "allowedDomains" : ["my.domain.com"],
        "jwtSecret": "AH3M 709 S3cR3T",
        "jwtExpiresIn": 120,
        "maxAllowedApiCalls": 10
      };
      mongoDb.MongoClient.connect(properties.mongoConnectUrl, {useNewUrlParser: true}, function (err, client) {
        assert.ok(client !== null, err);
        logger.info('Connected successfully to mongodb server');
        // creating indexes
        mongoClient = client;
        db = client.db(properties.dbName);
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

    }
  );
});

afterAll(async (done) => {
  await smtp.close(() => logger.info('SMTP Server closed!'));
  await mongoClient.close(true, () => logger.info('Mongo client closed!'));
  await server.close(() => logger.info('appServer stops listening'));
  await mongoServer.stop(() => {
    logger.info('All closed!');
  });
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
  let token = 'jasfwirjgiwrg';
  test('Token access with no token - 401', (done) => {

    request(server)
      .get('/api/mailbox/test-alive/email')
      .expect(401)
      .end((err, res) => {
        // just wait 1 second, so the email arrives for next steps.
        setTimeout(() => {
          done();
        }, 1000);
      });
  });

  test('Token access with invalid token - 401', (done) => {
    request(server)
      .get('/api/mailbox/test-alive/email')
      .set('Authentication', 'Bearer stam-token')
      .expect(401, done);
  });

  test('Get a valid token is valid', done => {
    request(server)
      .post('/api/auth/token')
      .send({})
      .set('Content-type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) {
          done(err);
        }
        token = res.body.token;
        jwt.verify(token, properties.jwtSecret); //throws error if invalid
        done();
      })
  });

  test('Verify token is valid and is created with predefined max allowed', () => {
    let decoded = jwt.verify(token, properties.jwtSecret);
    expect(decoded.maxAllowedApiCalls).toBe(10);
  });

  test('Verify that the same token is returned from the same IP', done => {
    request(server)
      .post('/api/auth/token')
      .send({})
      .set('Content-type', 'application/json')
      .expect(200)
      .end((err, res) => {
        if(err) {
          done(err);
        }
        expect(res.body.token).toBe(token);
        done();
      })
  });

  test('Verify 200 with valid token', done => {
    request(server)
      .get('/api/mailbox/alive-test/email')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done)
  });

  test('Verify 403 after 9 more tries', done => {
    function makeApiCall() {
      return request(server)
        .get('/api/mailbox/alive-test/email')
        .set('Content-type', 'application/json')
        .set('Authorization', 'Bearer ' + token)
    }


    makeApiCall().expect(200)
      .end(() => makeApiCall().expect(200)
        .end(() => makeApiCall().expect(200)
          .end(() => makeApiCall().expect(200)
            .end(() => makeApiCall().expect(200)
              .end(() => makeApiCall().expect(200)
                .end(() => makeApiCall().expect(200)
                  .end(() => makeApiCall().expect(200)
                    .end(() => makeApiCall().expect(200)
                      .end(() => makeApiCall()
                        .expect(403)
                        .end((err, res)=> {
                          if(err) {
                            done(err);
                          }
                          expect(res.body.message).toBe('API Quote Exceeded');
                          //clean burnt token from db
                          db.collection('tokens').remove({'token': token}, () => {
                            done();
                          });
                        })
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
  });
});



describe('Emails', () => {
  let emailInfo;
  let token;

  test('Get token', done => {
    request(server)
      .post('/api/auth/token')
      .send({})
      .set('Content-type', 'application/json')
      .expect(200)
      .end((err, res) => {
        token = res.body.token;
        done()
      });
  });


  test('List emails', done => {
    request(server)
      .get('/api/mailbox/alive-test/email')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        emailInfo = res.body[0];
        expect(emailInfo.subject).toBe('AHEM mail test! ✔');
        done();
      });
  });

  test('List emails on account that doesn\'t exist', done => {
    request(server)
      .get('/api/mailbox/stam/email')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  test('Get email details', done => {
    request(server)
      .get('/api/mailbox/alive-test/email/' + emailInfo.emailId)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        let email = res.body;
        expect(email.attachments.length).toBe(1);
        done();
      });
  });

  test('Get email details on account that doesn\'t exist', done => {
    request(server)
      .get('/api/mailbox/alive-test/email/stam')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  test('Get attachment', done => {
    request(server)
      .get('/api/mailbox/alive-test/email/' + emailInfo.emailId + '/attachments/ahem-happy.png')
      .set('Content-type', 'application/json')
      .expect(200)
      .expect('content-length', '57654')
      .expect('content-type', 'image/png', done);
  });

  test('Get attachment that doesn\'t exist', done => {
    request(server)
      .get('/api/mailbox/alive-test/email/' + emailInfo.emailId + '/attachments/ahem-happppppy.png')
      .set('Content-type', 'application/json')
      .expect(404, done);
  });

  test('Get email counter', done => {
    request(server)
      .get('/api/emailCount')
      .set('Content-type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.count).toBe(1);
        expect(res.body.since).toBeTruthy();
        expect(res.body.since).toBeLessThan(new Date().getTime());
        done();
      });
  });


  test('Delete email', done => {
    request(server)
      .delete('/api/mailbox/alive-test/email/' + emailInfo.emailId)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).toBe(true);
        done();
      });
  });
  test('Delete email that with data that generates and error', done => {
    request(server)
      .delete('/api/mailbox/alive-test/email/wegwrtwrt')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(500, done);
  });

  test('Delete email that with data that doesn\'t exist', done => {
    request(server)
      .delete('/api/mailbox/alive-test/email/' + emailInfo.emailId)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(404, done);
  });

  test('cleanup token', done => {
    db.collection('tokens').remove({'token': token}, () => {
      done();
    });
  });

});


describe('Mailbox', () => {

  let token;
  let emailInfo;

  test('Get token', done => {
    request(server)
      .post('/api/auth/token')
      .send({})
      .set('Content-type', 'application/json')
      .expect(200)
      .end((err, res) => {
        token = res.body.token;
        done()
      });
  });


  test('Call alive to generate an email and an account', (done) => {
    request(server)
      .get('/api/alive')
      .expect(200)
      .end((err, res) => {
        if(err) done(err);
        // wait for email
        setTimeout(done, 1000);
      })
  });


  test('List emails to verify account and email creation', done => {
    request(server)
      .get('/api/mailbox/alive-test/email')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        emailInfo = res.body[0];
        expect(emailInfo.subject).toBe('AHEM mail test! ✔');
        done();
      });
  });

  test('Delete account', done => {
    request(server)
      .delete('/api/mailbox/alive-test')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).toBeTruthy();
        done();
      });
  });

  test('List emails to verify account was deleted', done => {
    request(server)
      .get('/api/mailbox/alive-test/email')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
      .end((err, res) => {
        expect(res.body.error).toBe('MAILBOX IS EMPTY!');
        done();
      });
  });

});
