/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();

//indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/accounts/autocomplete', (req, res) => {
  req.body.prefix
});




module.exports = router;
