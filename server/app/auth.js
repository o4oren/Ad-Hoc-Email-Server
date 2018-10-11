/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('auth works');
});


function createNewToken(req, res) {
  console.log('ip', req.ip);
  const payload = {
    ip: req.ip
  };
//if a token doesn't exist for the ip, create new token
  console.log('creating new token');
  const token = jwt.sign(payload, req.properties.jwtSecret, {
    expiresIn: req.properties.jwtExpiresIn
  });
  //insert in db
  req.db.collection('tokens').update({'ip': req.ip, 'token': token}, { upsert: true },
    function (err, result) {
      if (err) {
        res.status(500).json({error: err});
      } else {
        res.status(200).json({
          success: true,
          token: token
        });
      }
    });
}

/**
 * get a token
 */
router.post('/authenticate', (req, res, next) => {
  // if a token exists for the ip and is not expired
  req.db.collection('tokens').findOne({'ip': req.ip},
    function (err, result) {
      if (err) {
        createNewToken(req, res);
        return;
      }
      if (result) {
        jwt.verify(result.token, req.properties.jwtSecret, function(err, decoded) {
          if (err) {
            console.log('failed to authenticate token... renewing.');
            createNewToken(req, res);
            return;
          } else {
            console.log('Reusing token');
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

module.exports = router;
