const IRequestWrapper = require("./request-wrapper");
const utils = require("../utils");

class ExpressRequestWrapper extends IRequestWrapper {

    constructor(req) {
        super(req);

        // rendering the given arguments failsave against missing fields
        if (typeof req.header != "function") {
            req.header = function () {
                return "";
            };
        }

        if (req.connection == null) {
            req.connection = {};
        }
    }

    getHeader(name, defaultValue, envVarSwitch) {
        var value = this.req.header(name);
        return utils.handleDefault(value, defaultValue, envVarSwitch);
    }

    getURL(defaultValue) {
        var value = this.req.originalUrl;
        return utils.handleDefault(value, defaultValue);
    }

    getMethod(defaultValue) {
        var value = this.req.method;
        return utils.handleDefault(value, defaultValue);
    }

    getRemoteHost(defaultValue, envVarSwitch) {
        var value = this.req.connection.remoteAddress;
        return utils.handleDefault(value, defaultValue, envVarSwitch);
    }

    getRemotePort(defaultValue, envVarSwitch) {
        var port = this.req.connection.remotePort;
        var value = port != null ? port.toString() : null; 
        return utils.handleDefault(value, defaultValue, envVarSwitch);
    }

    getProtocol() {
        return "HTTP" + (this.req.httpVersion == null ? "" : "/" + this.req.httpVersion);
    }
}

module.exports = ExpressRequestWrapper;