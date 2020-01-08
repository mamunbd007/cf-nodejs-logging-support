
const LEVELS = {
    "error": 0,
    "warn": 1,
    "info": 2,
    "verbose": 3,
    "debug": 4,
    "silly": 5
}

class Levels {
    getLevels() {
        return LEVELS;
    }

    getDefaultLevelValue() {
        return LEVELS.info;
    }

    getLevelValueByName(name) {
        if (name == null) return null;
        return (LOGGING_LEVELS[name.toLowerCase()] != undefined) ? LOGGING_LEVELS[name.toLowerCase()] : null;
    }

    getLevelNameByValue(value) {
        for (var key in LOGGING_LEVELS) {
            if (LOGGING_LEVELS[key] == value) {
                return key;
            }
        }
        return null;
    }

    checkThreshold(levelVal, thresholdVal) {
        return levelVal <= thresholdVal;
    }
}

var levels = new Levels();
module.exports = levels;

