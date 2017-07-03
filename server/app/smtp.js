/**
 * Created by ogeva on 7/1/2017.
 */

const SMTPServer = require('smtp-server').SMTPServer;
const fs = require("fs");
const path = require('path');
const fileHelper = require('../common/fileHelper');
const simpleParser = require('mailparser').simpleParser;

module.exports = {startSTMPServer: function startSTMPServer(properties, baseDir)
{
  const dataDir = fileHelper.path.isAbsolute(properties.dataDir) ? properties.dataDir : fileHelper.path.join(baseDir, properties.dataDir);
  const smtpPort = properties.smtpPort;
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

        simpleParser(mailDataString, (err, mail) => {
          fileHelper.createDir(path.join(dataDir, name));
          fileName = fileHelper.createFileName(mail);
          filePath = path.join(dataDir, name, fileName);
          fs.writeFileSync(filePath, JSON.stringify(mail), 'utf-8');

          if (rcptTo.length > 1) {
            for (i = 1; i < rcptTo.length; i++) {
              var currentName = rcptTo[i].address.split('@')[0];
              fileHelper.createDir(path.join(dataDir, currentName));
              fs.symlink(filePath, path.join(dataDir, currentName, fileName), callback);
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

  mailserver.listen(smtpPort);
  return mailserver;
}
}




