const LEVELS = {
    "error": 0,
    "warn": 1,
    "info": 2,
    "verbose": 3,
    "debug": 4,
    "silly": 5
}

function getLevels() {
    return LEVELS;
}

function getDefaultLevelValue() {
    return LEVELS.info;
}

function getLevelValueByName(name) {
    if (name == null) return null;
    return (LOGGING_LEVELS[name.toLowerCase()] != undefined) ? LOGGING_LEVELS[name.toLowerCase()] : null;
}

function getLevelNameByValue(value) {
    for (var key in LOGGING_LEVELS) {
        if (LOGGING_LEVELS[key] == value) {
            return key;
        }
    }
    return null;
}

function checkThreshold(levelVal, thresholdVal) {
    return levelVal <= thresholdVal;
}

exports.getLevels = getLevels;
exports.getDefaultLevel = getDefaultLevel;
exports.getLevelValueByName = getLevelValueByName;
exports.getLevelNameByValue = getLevelNameByValue;
exports.getDefaultLevelValue = getDefaultLevelValue;
exports.checkThreshold = checkThreshold;

