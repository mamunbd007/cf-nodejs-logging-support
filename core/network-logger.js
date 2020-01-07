const Logger = require("./logger");

class NetworkLogger extends Logger {
    constructor(parent) {
        super(false, parent);
    }

    logNetwork(req, res, next) {
        req.logger = this;
        req.getLogger = function() { this.logger };
        req.createLogger = function() { this.logger.createLogger.apply(this.logger, arguments)}

        // ...
    }
}

module.exports = NetworkLogger;