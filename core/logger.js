class Logger {
    constructor(isRoot, parent) { }

    setLoggingLevel(levelName) { }

    getLoggingLevel() { }

    getLoggingLevelValue() { }

    logMessage() { }

    isLogLevel(levelName) { }

    createLogger(customFields) { }

    setCustomFields(customFields) { }

    getField(name) { }

    setField(name, value) { }
}

module.exports = Logger