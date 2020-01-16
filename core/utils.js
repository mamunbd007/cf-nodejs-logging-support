const envHelper = require("./environment-helper");
const constants = require("./constants");

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

var resolveNestedVar = function (root, path) {
    // return, if path is empty.
    if (path == null || path.length == 0) {
        return null;
    }

    var rootObj;

    // if root is a string => parse it to an object. Otherwise => use it directly as object.
    if (typeof root === "string") {
        rootObj = JSON.parse(root);
    } else if (typeof root === "object") {
        rootObj = root;
    } else {
        return null;
    }

    // get value from root object
    var value = rootObj[path[0]];

    // cut first entry of the object path
    path.shift();

    // if the path is not empty, recursively resolve the remaining waypoints.
    if (path.length >= 1) {
        return resolveNestedVar(value, path);
    }

    // return the resolved value, if path is empty.
    return value;
};

// Return value, if it is not null. Otherwise return defaultValue. If an envVarSwitch has been given, 
// check if corresponding env var is set to true and return redaction placeholer otherwise.
var handleDefault = function(value, defaultValue, envVarSwitch) {
    var v = (value != null ? value : defaultValue);

    if (envVarSwitch != null) {
        if (!envHelper.isEnabled(envVarSwitch) && value != null) {
            return constants.REDACTION_PLACEHOLDER
        }
    }

    return v
}


exports.isValidObject = isValidObject;
exports.resolveNestedVar = resolveNestedVar;
exports.handleDefault = handleDefault;