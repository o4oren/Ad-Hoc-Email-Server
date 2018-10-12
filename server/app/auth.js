/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('./logger');

// indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('auth works');
});




/**
 * get a token
 */
router.post('/authenticate', (req, res, next) => {
  // if a token exists for the ip and is not expired
  req.db.collection('tokens').findOne({'ip': req.ip},
    function (err, result) {
      if (err) {
        logger.info(err);
        createNewToken(req, res);
        return;
      }
      if (result) {
        jwt.verify(result.token, req.properties.jwtSecret, function(err, decoded) {
          if (err) {
            logger.info('failed to verify token... renewing.');
            createNewToken(req, res);
            return;
          } else {
            logger.info('Reusing token');
            res.status(200).send({
              success: true,
              token: result.token
            });
            return;
          }
        });

      } else {
        createNewToken(req, res);
      }
    });


});

function createNewToken(req, res) {
  logger.info('ip', req.ip);
  const payload = {
    ip: req.ip
  };
//if a token doesn't exist for the ip, create new token
  logger.info('creating new token');
  const token = jwt.sign(payload, req.properties.jwtSecret, {
    expiresIn: req.properties.jwtExpiresIn
  });
  //insert in db
  req.db.collection('tokens').updateOne( {'ip': req.ip}, {$set: {'token': token}}, { upsert: true },
    function (err, result) {
      if (err) {
        logger.info(err)
        res.status(500).json({error: err});
      } else {
        res.status(200).json({
          success: true,
          token: token
        });
      }
    });
}

module.exports = router;
