<h1 align="center">
  Ad Hoc Email Server (AHEM)
</h1>

[![Build Status](https://travis-ci.org/o4oren/Ad-Hoc-Email-Server.svg?branch=master)](https://travis-ci.org/o4oren/Ad-Hoc-Email-Server)

Ad Hoc Email Server is, well, an ad hoc mail server. 
AHEM can be used for testing, where a large (or unknown) number of mailboxes are needed or to provide disposable emails for registering for services that might expose the email to spam;
This project will provide both a RESTful API and web application for consuming the service.
A working example of AHEM is always available [here](https://www.ahem.email "AHEM - Ad Hoc Disposable Temporary Email address").

## Getting Started
AHEM will accept any email sent to it (on the domains specified in the configuration), and create an ad hoc mailbox as needed.
Then just browse to its UI, enter the mailbox name and you'll see the emails contained in the mailbox.
That's it. No authentication. No account creation.

## Prerequisites
```
nodejs > v10 
angular cli installed globally (npm install -g @angular/cli)
mongodb
```

## Installation
```bash
# clone the repository
git clone https://github.com/o4oren/ahem-server.git
cd ahem-server
npm install
# builds the project.
npm run build:ssr

# there are other, convenience options for build and run in development mode.
# for development:
npm run startDev

# for prod:
# will run the backend which will also serve the front end form the `dist` folder.
node ahem.js
```

### Configuration
AHEM use several environment variables for configuration. These can be set up using a .env file (see [dotEnv docuemntation](https://www.npmjs.com/package/dotenv)).
An example file is located in the root of the project.
If a .env file is no found, you can just set these items as env variables.
A docker-compose file is also present in the root of the project, showing how these configuration properties can be set in a docker compose set up or passed to a docker image.

These are the available parameters:

Parameter | Description
--- | ---
serverBaseUri | The base address for your API server.
mongoConnectUrl | The mongodb connect URL in the form of "mongodb://localhost:27017/ahem".
appListenPort | The port the node app will bind to.
smtpPort | The SMTP server's port. Note that by default it is set to 2525 - this is done for testing purposes, as on many systems only a system account can listen on port 25.
emailDeleteInterval | The time in seconds between age checks for purging old files.
emailDeleteAge | The age in seconds above which emails will be deleted.
allowedDomains | An array of allowed email domains. These domains will be allowed by the server as RCPT TO: entries. This also makes the server not act as an open relay. Format: ["my.domain.com", "my.second-domain.com"].
customText | HTML string that will replace the default text in the landing page.
allowAutocomplete | If set to false, will prevent auto completing users in the ui.
jwtSecret | The JWT secret, if using token authentication.
jwtExpiresIn | JWT token TTL in seconds. -1 means token validation is not enforced.
maxAllowedApiCalls | If using token validation, this is the amount of API calls a token is allowed to make.

### Docker
* Build docker: docker build -t o4oren/ahem .
* Build FE only: docker build -t o4oren/ahem-frontend . -f Dockerfile_frontend 
* Run docker with external properties: docker run -v /[local.dotEvn.path]/.env:/opt/ahem/.env -it -p 3000:3000 -p 25:25 -d o4oren/ahem
* Sign into docker: docker exec -it ahem sh
* start docker stackand swarm: docker swarm init && docker stack deploy -c docker-compose.yml ahemswarmc
* stop docker stack: docker stack rm getstartedlab

* for debugging - run mongo on docker locally: docker run -d -p 27017:27017 -v ~/data:/data/db mongo

#### Build and run with mongodb
* docker-compose build
* docker-compose up

#### Palette ####
The AHEM color palette is available [here](https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=515f77&secondary.color=E3F2FD).

### API
The full API documentation is available [here](https://www.ahem.email/help/api "AHEM - API Help").

A brief list of RESTful resources:

HTTP Method | URI Path | Parameters | Description
--- | --- | --- | ---
POST | /api/mailbox/autocomplete | { "prefix":"value" } | Returns a partial list of mailboxes.
GET | /api/properties | |Returns global system properties.
POST | /api/auth/authenticate | { } | Returns an access token.
GET | /api/mailbox/{mailbox}/email | |Returns a list of the email objects in the mailbox.
GET | /api/mailbox/{mailbox}/email/{emailId} | |Gets the contents of a specific email.
PATCH | /api/mailbox/{acount}/email/{emailId} | {"isRead" : true} |Updates the emailInfo object (representation of the email meta data in the mailbox). Currently, only the isRead field is supported.
GET | /api/mailbox/{mailbox}/email/{emailId}/attachments/{filename} | |Downloads a specific attachment from an email.
DELETE | /api/mailbox/{mailbox}/email/{emailId} | |Deletes a specific email.
DELETE | /api/mailbox/{mailbox} | | Deletes a whole mailbox.

### Google Analytics

AHEM server is ready for Google Analytics. By default, when you set it up, it will not send information to GA though.
If you'd like to enable GA, add the snippet below in your /client/index.html file's head section, and rebuild the project.
Replace XX-XXXXXXXXX-X with your GA id.
```html
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'XX-XXXXXXXXX-X', 'auto');
  </script>
```

### Todo for 1.0

- [x] Error page when user/email doesn't exist
- [x] Empty mail page
- [x] Landing page
- [x] Errors on find user/email in api
- [x] Error on non existing user / message
- [x] Routing for messages
- [x] Read/unread icons
- [x] Attachments
- [x] Allow delete emails
- [x] Migrate to mongodb
- [x] Update missing emails page and loading circles
- [ ] Sort out logging
- [x] Separate mailbox view from email view pages 
- [x] Separate server and webapp properties 
- [x] Better home page
- [ ] Add apis to get mailbox references from email, get mailbox and email counts - both general and in mailbox context

## Authors
* [**Oren Geva**](https://github.com/o4oren)

See also the list of [contributors](https://github.com/o4oren/ahem-server/contributors) who participated in this project.

## License
This project is licensed under the GPLv3 License - see the [LICENSE.md](LICENSE.md) file for details
