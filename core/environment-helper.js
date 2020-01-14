const utils = require("./utils");

// Resolves nested and top-level environment variables
var resolve = function(path, defaultValue) {
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

exports.resolve = resolve;