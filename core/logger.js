const uuid = require("uuid/v4");
const util = require("util");
const utils = require("./utils");

const levels = require("./logging-levels");
const logFactory = require("./log-factory");

const LOG_TYPE = "log";

class Logger {
    constructor(isRoot, parent, correlationData) {
        this.isRoot = isRoot;
        this.parent = parent;
        this.loggingLevel = isRoot ? levels.getDefaultLevelValue() : null;
        this.customFields = {};
        this.correlationData = correlationData != null ? correlationData : this._createCorrelationData();
    }

    setLoggingLevel(levelName) {
        if (levelName == null && !this.isRoot) {
            this.loggingLevel = null;
            return true;
        } else {
            var level = levels.getLevelValueByName(levelName);
            if (level != null) {
                this.loggingLevel = level;
                return true;
            } else {
                return false;
            }
        }
    }

    getLoggingLevel() {
        return levels.getLevelNameByValue(this._getLoggingLevelValue())
    }

    isLoggingLevel(levelName) {
        var level = levels.getLevelValueByName(levelName);
        if (level != null) {
            return levels.checkThreshold(level, this._getLoggingLevelValue());
        }
        return false;
    }

    logMessage() {
        var args = Array.prototype.slice.call(arguments);
        var level = args[0];

        if (!levels.checkThreshold(levels.getLevelValueByName(level), this._getLoggingLevelValue())) {
            return false;
        }

        args.shift();

        var customFieldsFromArgs = {};
        if (typeof args[args.length - 1] === "object") {
            if (utils.isValidObject(args[args.length - 1])) {
                customFieldsFromArgs = args[args.length - 1];
            }
            args.pop();
        }
    
        var msg = util.format.apply(util, args);

        var log = logFactory.createLog();
        
        // add main log data
        log.addData({
            level: level,
            msg: msg,
            type: LOG_TYPE
        }, true);

        // add correlation data, if available
        if (this.correlationData) {
            log.addData({
                correlation_id: this.correlationData.correlation_id,
                tenant_id: this.correlationData.tenant_id,
                request_id: this.correlationData.request_id
            }, true);
        }

        // add custom field data to log
        log.addCustomFieldData({...this._getOwnAndAncestorsCustomFields(), ...customFieldsFromArgs});

        // TODO: use proper writer
        console.log(JSON.stringify(log.getData()));

        return true;
    }

    createLogger(customFields) {
        var logger = new Logger(false, this, this.correlationData);
        if (customFields != null) {
            logger.setCustomFields(customFields);
        }
        return logger;
    }

    setCustomFields(customFields) {
        if (utils.isValidObject(customFields, true)) {
            this.customFields = customFields;
            return true;
        }
        return false;
    }

    getField(name) { }

    setField(name, value) { }

    _getLoggingLevelValue() {
        if (this.isRoot || this.loggingLevel != null) {
            return this.loggingLevel;
        } else {
            return this.parent._getLoggingLevelValue();
        }
    }

    _getOwnAndAncestorsCustomFields() {
        if (this.isRoot) {
            return this.customFields;
        } else {
            return {...this.parent._getOwnAndAncestorsCustomFields(), ...this.customFields}
        }
    }

    _createCorrelationData() {
        return {
            correlation_id: uuid()
        }
    }

}

module.exports = Logger