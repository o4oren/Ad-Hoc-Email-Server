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

/**
 * returns the attachment
 */
router.get('/account/:account/:timestamp/attachments/:filename', (req, res) => {
  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let mail = JSON.parse(fileHelper.getFileContents(fileHelper.path.join(dataDir, req.params.account), completeFileName));
    let attachmentsFound = mail.attachments.filter(attachment => attachment.filename == req.params.filename);
    console.log("attachment found",attachmentsFound);
    res.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'Content-disposition': 'attachment;filename=' + attachmentsFound[0].filename,
      'Content-Length': attachmentsFound[0].size
    });
    res.end(new Buffer(attachmentsFound.content.data, 'binary'));
  }
  catch (e) {
    res.status(404).send({error: "FILE NOT FOUND"});
  }
});

router.delete('/account/:account/:timestamp', (req, res) => {

  try {
    let completeFileName = fileHelper.getFileOrFolderNameByPrefix(fileHelper.path.join(dataDir, req.params.account), req.params.timestamp)[0];
    let completePath = fileHelper.path.join(fileHelper.path.join(dataDir, req.params.account, completeFileName));
    console.log(completePath);
    fileHelper.deleteFile(completePath);
    res.json({success:true});
  }
  catch (e) {
    console.log(e);
    res.status(500).send({error: "FAILED TO DELETE FILE", succes:false});
  }



});

router.delete('/account/:account', (req, res) => {

  try {
    let accountPath = fileHelper.path.join(dataDir, req.params.account);
    console.log(accountPath);
    fileHelper.emptyDirectory(accountPath);
    res.json({success:true});
  }
  catch (e) {
    console.log(e);
    res.status(500).send({error: "FAILED TO DELETE ACCOUNT", succes:false});
  }
});

router.delete('/dataDir', (req, res) => {

  try {
    console.log('Deleting data dir: ' + dataDir);
    fileHelper.emptyChildDirs(dataDir);
    res.json({success:true});
  }
  catch (e) {
    console.log(e);
    res.status(500).send({error: "FAILED TO DELETE ALL ACCOUNTS", succes:false});
  }
});

module.exports = router;

