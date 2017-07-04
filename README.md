
# ahem-server

An ad-hoc mail server. Create and use ad hoc disposable mailboxes for testing or any other purpose.
This project will provide both RESTful api and web application for consuming the service.

## Prerequisites
```
nodejs v6.11
npm v3.10
```

## Installation
```
$ git clone https://github.com/o4oren/ahem-server.git
$ cd ahem-server
# install the project's dependencies
$ npm install
# starts backend on port 3000 and ng serve the front end at port 4200. Watches your files and uses livereload by default. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. For this mode, you need to install npm install -g concurrently
$ npm devStart
# prod build, will output the production front end application in `dist`
# the produced code can be deployed (rsynced) to a remote server
$ npm run build
# prod run - will run the backend which will also serve the front end form the `dist` folder.
$ npm start
```
## Getting Started

TBD

## API

HTTP Method | URI Path | Parameters | Descritpion
--- | --- | --- | ---
GET | /api/account/{account} | |returns a list of the email objects in the account
GET | /api/account/{account}/{timestamp} | |Gets the contents of a specific email
POST | /account/autocomplete | { "prefix":"value" } | Returns a partial list of accounts

#### GET /api/account/{account}/{timestamp}
##### Query params
account - account name
timestamp - email's time stamp




## change log

### 0.5
* REST api initial implementation
* Using configuration file
* Restructure the project

### 0.3
* backend mail server only. 


## Authors

* **Oren Geva** 

See also the list of [contributors](https://github.com/o4oren/ahem-server/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details



