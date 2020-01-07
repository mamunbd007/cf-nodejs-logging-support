const RootLogger = require("./root-logger");

var rootLogger = new RootLogger();

exports.getRootLogger = function() {
    return rootLogger;
}