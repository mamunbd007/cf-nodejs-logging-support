const Logger = require("./logger");
const NetworkLogger = require("./root-logger");

class RootLogger extends Logger {
    constructor() {
        super(true, null);
    }

    setConfig(config) { }

    registerCustomFields(fieldNames) { }

    logNetwork(req, res, next) {
        var networkLogger = new NetworkLogger(this);
        networkLogger.logNetwork(req, res, next);
    }

    setSinkFunction(fct) {}

    createWinstonTransport() {}
}

module.exports = RootLogger