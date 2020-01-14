const Logger = require("./logger");

const LOG_TYPE = "request";

class NetworkLogger extends Logger {
    constructor(parent) {
        super(false, parent, null);
    }

    logNetwork(req, res, next) {
        req.logger = this;
        req.getLogger = function() { this.logger };
        req.createLogger = function(customFields) { this.logger.createLogger.apply(this.logger, customFields)}

        // ...
    }
}

module.exports = NetworkLogger;