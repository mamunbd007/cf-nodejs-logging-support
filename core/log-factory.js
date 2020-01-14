const customFieldsRegistry = require("./custom-fields-registry")

const NS_PER_SEC = 1e9;

class LogFactory {
    constructor() {
        this.baseLogStr = "{}";
    }

    createLog() {
        var log = new Log();
        log.addData(JSON.parse(this.baseLogStr), true);
        log.addData(this._createWrittenTimestamp());
        return log;
    }

    setBaseLog(baseLog) {
        this.baseLogStr = JSON.stringify(baseLog);
    }

    _createWrittenTimestamp() {
        var time = process.hrtime();
        return {
            written_at: (new Date()).toJSON(),
            written_ts: time[0] * NS_PER_SEC + time[1]
        }
    }
}

class Log {
    constructor() {
        this.data = {};
    }

    addData(newData, overwrite) {
        if (overwrite) {
            this.data = { ...this.data, ...newData };
        }
        else {
            this.data = { ...newData, ...this.data };
        }
    }

    getData() {
        return this.data;
    }

    addCustomFieldData(data) {
        var customFields = {};
        var topLevelFields = {};

        for (var key in data) {
            var value = data[key];

            // Write value to customFields object. Stringify, if necessary.
            if ((typeof value) != "string") {
                value = JSON.stringify(value);
            }

            if (customFieldsRegistry.isRegistered(key)) {
                customFields[key] = value;
            } else {
                topLevelFields[key] = value;
            }
        }


        if (Object.keys(customFields).length > 0) {
            this.addData({
                customFields: customFields
            }, true);
        }

        if (Object.keys(topLevelFields).length > 0) {
            this.addData(topLevelFields, false);
        }
    }
}

var logFactory = new LogFactory();
module.exports = logFactory;