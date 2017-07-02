/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();

/* GET api listing. */
//noinspection BadExpressionStatementJS
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
