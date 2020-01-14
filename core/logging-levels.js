
const LEVELS = {
    "error": 0,
    "warn": 1,
    "info": 2,
    "verbose": 3,
    "debug": 4,
    "silly": 5
}

var getLevels = function () {
    return LEVELS;
};

var getDefaultLevelValue = function () {
    return LEVELS.info;
}

var getLevelValueByName = function (name) {
    if (name == null) return null;
    return (LEVELS[name.toLowerCase()] != undefined) ? LEVELS[name.toLowerCase()] : null;
}

var getLevelNameByValue = function (value) {
    for (var key in LEVELS) {
        if (LEVELS[key] == value) {
            return key;
        }
    }
    return null;
}

var checkThreshold = function(levelVal, thresholdVal) {
    return levelVal <= thresholdVal;
}

exports.getLevels = getLevels;
exports.getDefaultLevelValue = getDefaultLevelValue;
exports.getLevelValueByName = getLevelValueByName;
exports.getLevelNameByValue = getLevelNameByValue;
exports.checkThreshold = checkThreshold;