/**
 * Created by ogeva on 7/1/2017.
 */

const SMTPServer = require('smtp-server').SMTPServer;
const fs = require("fs");
const path = require('path');
const fileHandler = require('./fileHandler');
const simpleParser = require('mailparser').simpleParser;

fileHandler.createDir('data');
const baseDir = path.join(__dirname, '..', 'data');

const mailserver = new SMTPServer({
  logger: true,
  authOptional: true,
  disableReverseLookup: true,
  onConnect(session, callback){
    console.log("Connection started.")
    return callback(); // Accept the connection
  },
  onData(stream, session, callback){
    var mailDataString = '';
    var rcptTo = session.envelope.rcptTo;

    stream.on("data", function (chunk) {
      mailDataString += chunk;
    });

    stream.on("end", function () {
      name = rcptTo[0].address.split('@')[0];

      var fileName;
      var filePath;

      simpleParser(mailDataString, (err, mail)=>{
        fileHandler.createDir(path.join(baseDir,name));
        fileName = Date.now().toString() + '###' + mail.from.value[0].address + '###' + mail.subject;
        filePath = path.join(baseDir,name,fileName);
        fs.writeFileSync(filePath, JSON.stringify(mail) , 'utf-8');

        if (rcptTo.length > 1) {
          for (i = 1; i < rcptTo.length; i++) {
            var currentName = rcptTo[i].address.split('@')[0];
            fileHandler.createDir(path.join(baseDir,currentName));
            fs.symlink(filePath, path.join(baseDir ,currentName, fileName), callback);
          }
        }

      });


      callback();
    });


  }
});

mailserver.on('error', err => {
  console.log('Error %s', err.message);
});

mailserver.listen(25);



