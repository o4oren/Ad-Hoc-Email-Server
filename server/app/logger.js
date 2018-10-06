var winston =  require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.Console({
      format: winston.format.simple()
    }),
  ]
});

module.exports = logger;
module.exports.stream =  {
  write: function (message, encoding) {
    logger.info(message);
  }
};
