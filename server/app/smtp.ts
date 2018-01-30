/**
 * Created by ogeva on 7/1/2017.
 */

const SMTPServer = require('smtp-server').SMTPServer;
const simpleParser = require('mailparser').simpleParser;

module.exports = {
  startSTMPServer: function startSTMPServer(properties, baseDir, db) {
    const smtpPort = properties.smtpPort;
    const mailserver = new SMTPServer({
        logger: true,
        authOptional: true,
        disabledCommands: ['AUTH'],
        disableReverseLookup: true,
        onConnect(session, callback){
          console.log("Connection started.")
          return callback(); // Accept the connection
        },
        onRcptTo(address, session, callback){
          if (!validateAddress(address, properties.allowedDomains)) {
            return callback(new Error('Only the domains ' + [JSON.stringify(properties.allowedDomains)] + ' are allowed to receive mail'));
          }
          return callback(); // Accept the address
        },
        onData(stream, session, callback){
          let mailDataString = '';
          const rcptTo = session.envelope.rcptTo;

          stream.on("data", function (chunk) {
            mailDataString += chunk;
          });

          stream.on("end", function () {

            simpleParser(mailDataString, (err, mail) => {
              mail.timestamp = new Date().getTime();

              //replace header map with one in which  . in the header keys are changed to _ due to insertion probelm
              mail.headers.forEach(function(value, key) {
                if(key.includes('.')){
                  let newkey = key.replace(/\./g, '_');
                  mail.headers.set(newkey, mail.headers.get(key));
                  mail.headers.delete(key);
                }
              });

              db.collection('emails').insertOne(mail, function (err, result) {

                if (err) {
                  console.error("Error in writing email", err);
                  return;
                }

                mail.to.value.forEach(recipient => {
                  let nameAndDomain = recipient.address.split('@');
                  if (properties.allowedDomains.indexOf(nameAndDomain[1].toLowerCase()) > -1) {
                    db.collection('accounts').updateOne({"name": nameAndDomain[0].toLowerCase()}, {
                      $push: {
                        "emails": {
                          "emailId": mail._id,
                          "sender": mail.from.value[0],
                          "subject": mail.subject,
                          "timestamp": mail.timestamp,
                          "isRead":false
                        }
                      }
                    }, {upsert: true}, function (err, res) {
                      if (err)
                        console.error("Error in writing to account", err);
                      console.log("Inserted results into the collection.");
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
      console.log('Error %s', err.message);
    });

    mailserver.listen(smtpPort);

    return mailserver;
  }
}

function validateAddress(address, allowedDomains) {
  //return true always if allowedDomains is empty or null
  if(!allowedDomains || (allowedDomains && allowedDomains.length)) {
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
  console.log(allowed);
  return allowed;
}



