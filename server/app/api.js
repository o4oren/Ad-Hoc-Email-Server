/**
 * Created by ogeva on 7/1/2017.
 */
const express = require('express');
const router = express.Router();
const fileHelper = require('../common/fileHelper');
var properties = fileHelper.parseJsonFile('properties.json');
var dataDir = fileHelper.path.isAbsolute(properties.dataDir) ? properties.dataDir : properties.dataDir;
//indicates the api server is up
router.get('/alive', (req, res) => {
  res.send('api works');
});

/**
 * returns a list of account names starting with the req.body.prefix
 */
router.post('/account/autocomplete', (req, res) => {
  accounts = fileHelper.getFileOrFolderNameByPrefix(dataDir, req.body.prefix);
  res.json(accounts);
});

router.get('/properties', (req, res, next) => {
  res.json(properties);
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account', (req, res, next) => {
  if(!fileHelper.fs.existsSync(fileHelper.path.join(dataDir, req.params.account))) {
    res.status(404).send({error: "USER DOES NOT EXIST"});
    return;
  }
  let emails = [];
  let files = fileHelper.listFiles(fileHelper.path.join(dataDir, req.params.account));
  files.forEach((f) => {
    emails.push(fileHelper.parseFileName(f));
  });

  res.json(emails);
});

/**
 * returns a list of mail metadata bojects in a specific account
 */
router.get('/account/:account/:timestamp', (req, res) => {

  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let mail = fileHelper.getFileContents(fileHelper.path.join(dataDir, req.params.account), completeFileName);
    res.json(mail);
  }
  catch (e) {
    res.status(404).send({error: "FILE NOT FOUND"});
  }



});

router.delete('/account/:account/:timestamp', (req, res) => {

  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let mailFile = fileHelper.getFileContents(fileHelper.path.join(dataDir, req.params.account), completeFileName);
    fileHelper.deleteFile(mailFile);
    res.json({success:true});
  }
  catch (e) {
    res.status(500).send({error: "FAILED TO DELETE FILE", succes:false});
  }



});

module.exports = router;

