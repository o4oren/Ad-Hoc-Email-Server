/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');

// indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('auth works');
});



/**
 * get a token
 */
router.post('/authenticate', (req, res, next) => {
  console.log('ip', req.ip);
  const payload = {
    ip: req.ip
  };
  const token = jwt.sign(payload, req.properties.jwtSecret, {
    expiresIn: req.properties.jwtExpiresIn // expires in 24 hours
  });

  // return the information including token as JSON
  res.status(200).send({
    success: true,
    token: token
  });
});

module.exports = router;
