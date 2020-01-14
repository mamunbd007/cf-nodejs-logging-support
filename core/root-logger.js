const Logger = require("./logger");
const NetworkLogger = require("./root-logger");
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

    logNetwork(req, res, next) {
        var networkLogger = new NetworkLogger(this);
        networkLogger.logNetwork(req, res, next);
    }

    setSinkFunction(fct) {}

    createWinstonTransport() {}
}

module.exports = RootLogger