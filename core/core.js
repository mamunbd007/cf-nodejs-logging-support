const RootLogger = require("./root-logger");
const logFactory = require("./log-factory");
const envHelper = require("./environment-helper");

const DEFAULT_DASH = "-";

var rootLogger = new RootLogger();

logFactory.setBaseLog({
    component_name: envHelper.resolve(["VCAP_APPLICATION", "application_name"], DEFAULT_DASH),
    component_id: envHelper.resolve(["VCAP_APPLICATION", "application_id"], DEFAULT_DASH),
    organization_name: envHelper.resolve(["VCAP_APPLICATION", "organization_name"], DEFAULT_DASH),
    organization_id: envHelper.resolve(["VCAP_APPLICATION", "organization_id"], DEFAULT_DASH),
    space_name: envHelper.resolve(["VCAP_APPLICATION", "space_name"], DEFAULT_DASH),
    space_id: envHelper.resolve(["VCAP_APPLICATION", "space_id"], DEFAULT_DASH),
    container_id: envHelper.resolve("CF_INSTANCE_IP", DEFAULT_DASH),
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