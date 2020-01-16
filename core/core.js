const RootLogger = require("./root-logger");
const logFactory = require("./log-factory");
const envHelper = require("./environment-helper");
const constants = require("./constants");

var rootLogger = new RootLogger();

logFactory.setBaseLog({
    component_name: envHelper.resolve(["VCAP_APPLICATION", "application_name"],  constants.DEFAULT_SIGN),
    component_id: envHelper.resolve(["VCAP_APPLICATION", "application_id"],  constants.DEFAULT_SIGN),
    organization_name: envHelper.resolve(["VCAP_APPLICATION", "organization_name"],  constants.DEFAULT_SIGN),
    organization_id: envHelper.resolve(["VCAP_APPLICATION", "organization_id"],  constants.DEFAULT_SIGN),
    space_name: envHelper.resolve(["VCAP_APPLICATION", "space_name"],  constants.DEFAULT_SIGN),
    space_id: envHelper.resolve(["VCAP_APPLICATION", "space_id"],  constants.DEFAULT_SIGN),
    container_id: envHelper.resolve("CF_INSTANCE_IP",  constants.DEFAULT_SIGN),
    component_instance: envHelper.resolve(["VCAP_APPLICATION", "instance_index"], "0"),
    source_instance: envHelper.resolve(["VCAP_APPLICATION", "instance_index"], "0"),
    component_type: "application",
    layer: "[NODEJS]",
    logger: "nodejs-logger",
});

rootLogger.logNetwork = function(req, res, next) {
    rootLogger._logNetwork(req, res, next)
}

module.exports = rootLogger;