const levels = require("./logging-levels");

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

    logMessage() { }

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

}

module.exports = Logger