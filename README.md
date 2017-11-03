
# Ad Hoc Email Server (AHEM)

Ad Hoc Email Server is, well, an ad hoc mail server. 
AHEM server can be used for testing, were a large (or unknown) number of mailboxes is needed or to provide disposable emails for registering into services that might expose the email for spam;
This project will provide both RESTful api and web application for consuming the service.


![Alt text](/../images/images/screenshot.png?raw=true "AHEM mail server")

## Getting Started
Ahem mail server will accept any email sent to it (on the domains specified in the configuration), and create an ad hoc mailbox as needed.
Then just browse to it's UI, enter the account name and you'll see the emails the account received.
That's it. No authentication. No account creation.

## Prerequisites
```
nodejs v6.11
npm v3.10
angular cli installed globally (npm install -g @angular/cli)
mongodb installed and running
```

## Installation
```bash
# clone the repository
git clone https://github.com/o4oren/ahem-server.git
cd ahem-server
# builds the project.
# the build script actually runs npm install to install all dependencies, 
# npm rebuild node-sass to rebuild the sass compiler for the system,
# and ng build --prod to build a 'production' version of the ng2 front end.
# There are other, convenience options for build and run in development mode.
npm run build
# prod run - will run the backend which will also serve the front end form the `dist` folder.
npm start
```

### Configuration
A configuration file names properties.json is located in the root of the project.
Edit it to fit your use case.
Parameters:
* dataDir - location of the actual email files saved on the filespace.
* appListenPort - the port the node app will bind to.
* smtpPort - ahem... you know.
* emailDeleteInterval - The time in seconds between age checks for purging old files.
* emailDeleteAge - The age in seconds above which emails will be deleted
* allowedDomains - An array of allowed email domains. These domains will be allowed by the server as RCPT TO: entries. This also makes the server not act as an open relay. Format: ["my.domain.com", "my.second-domain.com"]
* customText - html string that will replace the default text in the landing page
* mongoConnectUrl - the mongodb connect url in the form of "mongodb://localhost:27017/ahem"

### API

HTTP Method | URI Path | Parameters | Descritpion
--- | --- | --- | ---
POST | /account/autocomplete | { "prefix":"value" } | Returns a partial list of accounts
GET | /api/properties | |returns the properties.json content
GET | /api/account/{account} | |returns a list of the email objects in the account
GET | /api/account/{account}/{timestamp} | |Gets the contents of a specific email
GET | /api/account/{account}/{timestamp}/attachments/{filename} | |Downloads a specific attachment form an email
DELETE | /api/account/{account}/{timestamp} | |Deletes a specific email
DELETE | /api/account/{account} | | Deletes a whole account
DELETE | /api/dataDir | | Empty the data folder

### Todo for 1.0

- [x] Error page when user/email doesn't exist.
- [x] Empty mail page
- [x] Landing page
- [x] Errors on find user/email in api
- [x] Error on non existing user / message
- [x] routing for messages
- [x] read/unread icons
- [x] attachments
- [x] allow delete emails
- [x] migrate to mongodb
- [] update missing emails page and loading circles
- [] Add apis to get account references from email, get account and email counts - both general and in account context


## Authors

* **Oren Geva**

See also the list of [contributors](https://github.com/o4oren/ahem-server/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details



