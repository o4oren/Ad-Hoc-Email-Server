// These are important and needed before anything else
const express = require('express');
const fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const css = fs.readFileSync('server/app/swagger-ui.css', 'utf8');

const swaggerOptions = {
  customCss: css
}

const logger = require('./logger');


const app = express();
const morgan = require('morgan');
const path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  api = require('./api'),
  auth = require('./auth');

const DIST_FOLDER = path.join(process.cwd() , 'dist');
logger.debug(DIST_FOLDER);

function start(properties, db) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
  app.set('view engine', 'html');
  app.use(express.static(path.join(DIST_FOLDER, "browser")));
  app.set('views', path.join(DIST_FOLDER, "browser"));


  app.use(function (req, res, next) {
    req.db = db;
    req.properties = properties;
    next();
  });

// Parsers for POST data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.enable('trust proxy');



  // use morgan to log api calls
  morgan.token('xff', function (req, res) { return req.headers['X-Forwarded-For'];
  });
  app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms :xff',
    { 'stream': logger.stream }));

// Set routes
  app.use('/api', api);

// Server static files from /browser
app.get('*.*', express.static(path.join(DIST_FOLDER, "browser")));

// All regular browser angular folder
  app.get('*', (req, res) => {
    res.sendfile(path.join(DIST_FOLDER, "browser", "index.html"));
  });

// error handler
  app.use(function (err, req, res, next) {
    logger.error(err.message);
    res.status(500).send({error: err.name + ' | ' + err.message});
  });

// delete emails every interval
  setInterval(function () {
    logger.info('checking for emails older than ' + properties.emailDeleteAge + ' seconds');
    db.collection('emails').find({'timestamp': {$lt: (new Date().getTime() - (properties.emailDeleteAge * 1000))}},
      {'_id': 1}).toArray(function (err, emailsToDelete) {
      logger.info(emailsToDelete.length + ' emails with age > ' + properties.emailDeleteAge + ' seconds where found');
      emailsToDelete.forEach(email => {
        db.collection('mailboxes').update(
          {'emails.emailId': email._id},
          {$pull: {'emails': {'emailId': email._id}}},
          {'multi': true}
          , function (err1, numberRemoved) {
            if (err1) {
              logger.error(err1);
            }
            logger.info('Removing ' + email._id.toString()
              + ' has been removed from '
              + JSON.parse(numberRemoved).nModified + 'mailboxess.');

          }
        );

        db.collection('emails').remove({'_id': email._id}, function (err1, result) {
          if (err1) {
            logger.error(err1);
          } else {
            logger.info('Deleting email ' + email._id.toString(), result.result);
          }
        });
      });
    });

    db.collection('mailboxes').remove({'emails': {$exists: true, $eq: []}}, function (err, result) {
      if (err) {
        logger.error(err);
      } else {
        logger.info('Removed empty mailboxes', result.result);
      }
    });

  }, properties.emailDeleteInterval * 1000);
  return app;
}

module.exports = start;
module.exports.app = app;
