const Logger = require("./logger");
const NetworkLogger = require("./root-logger");
const customFieldRegistry = require("./custom-field-registry");

class RootLogger extends Logger {
    constructor() {
        super(true, null);
    }

    setConfig(config) { }

    registerCustomFields(fieldNames) { 
        customFieldRegistry.register(fieldNames)
    }

    logNetwork(req, res, next) {
        var networkLogger = new NetworkLogger(this);
        networkLogger.logNetwork(req, res, next);
    }

    setSinkFunction(fct) {}

    createWinstonTransport() {}
}

module.exports = RootLogger