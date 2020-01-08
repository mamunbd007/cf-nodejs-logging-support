// checks if the given argument is a non-empty instance of Object
var isValidObject = function (obj, canBeEmpty) {
    if (obj === null || obj === undefined) {
        return false;
    } else if (typeof obj !== "object") {
        return false;
    } else if (!canBeEmpty && Object.keys(obj).length === 0) {
        return false;
    }
    return true;
};


exports.isValidObject = isValidObject;