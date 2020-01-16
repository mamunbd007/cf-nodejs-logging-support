const utils = require("./utils");

// Resolves nested and top-level environment variables
var resolve = function (path, defaultValue) {
    var pathArr;
    if (typeof path === "string") {
        pathArr = [path];
    } else if (Array.isArray(path)) {
        // copy array
        pathArr = path.slice();
    } else {
        return null;
    }

    var value = utils.resolveNestedVar(process.env, pathArr);
    if (value != null) {
        return value;
    }

    return defaultValue;
}

// Checks if env var with given name is set to true
var isEnabled = function (name) {
    var val = process.env[name];
    if (val && typeof val == "string") {
        return (val.toLowerCase() == "true");
    }
    
}

exports.resolve = resolve;
exports.isEnabled = isEnabled;