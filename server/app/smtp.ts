/**
 * Created by ogeva on 7/1/2017.
 */

const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

module.exports = {
  startSTMPServer: function startSTMPServer(properties, baseDir, db, logger) {
    const smtpPort = properties.smtpPort;
    const mailserver = new SMTPServer({
        logger: false,
        authOptional: true,
        disabledCommands: ['AUTH'],
        disableReverseLookup: true,
        maxClients: 5,
        onConnect(session, callback) {
          logger.info('SMTP Connect from ' + session.remoteAddress + ' HELO as ' + JSON.stringify(session));
          return callback(); // Accept the connection
        },
        onMailFrom(address, session, callback) {
          logger.info('SMTP MAIL FROM: ' + JSON.stringify(address));
        },
        onRcptTo(address, session, callback) {
          logger.info('SMTP RCPT TO: ' + JSON.stringify(address));
          if (!validateAddress(address, properties.allowedDomains)) {
            logger.error(address + ' is not allowed!');
            return callback(new Error('Only the domains ' + [JSON.stringify(properties.allowedDomains)] + ' are allowed to receive mail'));
          }
          return callback(); // Accept the address
        },
        onData(stream, session, callback) {
          logger.info('SMTP DATA start');
          let mailDataString = '';

          stream.on('data', function (chunk) {
            mailDataString += chunk;
          });

          stream.on('end', function () {
            logger.info('SMTP DATA end');
            simpleParser(mailDataString, (err, mail) => {
              mail.timestamp = new Date().getTime();

              // replace header map with one in which  . in the header keys are changed to _ due to insertion probelm
              mail.headers.forEach(function(value, key) {
                if (key.includes('.')) {
                  const newkey = key.replace(/\./g, '_');
                  mail.headers.set(newkey, mail.headers.get(key));
                  mail.headers.delete(key);
                }
              });

              db.collection('emails').insertOne(mail, function (err1, result) {

                if (err1) {
                  logger.error('Error in writing email to db!', err1);
                  return;
                }

                mail.to.value.forEach(recipient => {
                  const nameAndDomain = recipient.address.split('@');
                  if (properties.allowedDomains.indexOf(nameAndDomain[1].toLowerCase()) > -1) {
                    db.collection('accounts').updateOne({'name': nameAndDomain[0].toLowerCase()}, {
                      $push: {
                        'emails': {
                          'emailId': mail._id,
                          'sender': mail.from.value[0],
                          'subject': mail.subject,
                          'timestamp': mail.timestamp,
                          'isRead': false
                        }
                      }
                    }, {upsert: true}, function (err2, res) {
                      if (err2) {
                        logger.error('Error in writing to account db', err2);
                      }
                      logger.info('updated email content in db.');
                    });
                  }

                });
              });
            });
            callback();
          });
        }
      }
      )
    ;

    mailserver.on('error', err => {
      logger.error('Error %s', err.message);
    });

    mailserver.listen(smtpPort);

    return mailserver;
  }
};

function validateAddress(address, allowedDomains) {
  // return true always if: a) allowedDomains is empty or b) null or c) properties.json only has my.domain.com
  if (!allowedDomains ||
    (allowedDomains && allowedDomains.length ||
      (allowedDomains && allowedDomains.length === 1 && allowedDomains[0] === 'my.domain.com')
    )) {
    return true;
  }


  let allowed = false;

  allowedDomains.forEach(domain => {
    // console.log(JSON.stringify(address.address.split('@')[1].toLowerCase()));
    // console.log(JSON.stringify(domain));
    if (address.address.split('@')[1].toLowerCase().endsWith(domain.toLowerCase())) {

      allowed = true;
    }
  });
  return allowed;
}



