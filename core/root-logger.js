const Logger = require("./logger");
const NetworkLogger = require("./network-logger");
const customFieldsRegistry = require("./custom-fields-registry");

class RootLogger extends Logger {
    constructor() {
        super(true, null, {});

        // Root logger does not have correlationData
        this.correlationData = null;
    }

    setConfig(config) { }

    registerCustomFields(fieldNames) { 
        customFieldsRegistry.register(fieldNames)
    }

    setSinkFunction(fct) {}

    createWinstonTransport() {}

    _logNetwork(req, res, next) {
        var networkLogger = new NetworkLogger(this);
        networkLogger.logNetwork(req, res, next);
    }
}

module.exports = RootLogger