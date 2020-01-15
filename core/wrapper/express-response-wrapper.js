const IResponseWrapper = require("./response-wrapper");
const utils = require("../utils");

class ExpressResponseWrapper extends IResponseWrapper {

    constructor(res) {
        super(res);
        var self = this;

        this.callback = null;

        if (res.get == null) {
            res.get = function () {
                return "";
            };
        }

        res.on("finish", function () {
            if (self.callback) self.callback(self);
        });
    }

    getHeader(name, defaultValue) {
        var value = this.res.get(name);
        return utils.handleDefault(value, defaultValue);
    }

    getStatusCode(defaultValue) {
        var value = this.res.statusCode;
        return utils.handleDefault(value, defaultValue);
    }

    setSendCallback(callback) {
        this.callback = callback;
    }
}

module.exports = ExpressResponseWrapper;