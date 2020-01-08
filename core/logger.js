const levels = require("./logging-levels");
const logFactory = require("./log-factory");

class Logger {
    constructor(isRoot, parent) {
        this.isRoot = isRoot;
        this.parent = parent;
        this.loggingLevel = isRoot ? levels.getDefaultLevelValue() : null;
        this.customFields = {};
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

        if (!levels.checkThreshold(levels.getLevelValueByName(level)), this.getLoggingLevelValue()) {
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

        var customFields = {..._getOwnAndAncestorsCustomFields(), ...customFieldsFromArgs}
        
        log.addData({
            level: level,
            msg: msg
        }, true)

        log.addCustomFields(customFields);

        console.log(JSON.parse(log.getData()));

        return true;
    }

    createLogger(customFields) {
        var logger = new Logger(false, this);
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
            return this.loggingLevel
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

}

module.exports = Logger