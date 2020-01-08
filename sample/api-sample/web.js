
// Nodejs logging support sample app
var express = require("express");
var log = require("../../core/core");
var app = express();

// set the logging level threshold
log.setLoggingLevel("info");

// register names of custom fields
log.registerCustomFields(["node_version", "pid", "platform"])

// add logger to the server network queue to log all incoming requests.
app.use(log.logNetwork);

// host static files
app.use("/", express.static(__dirname + "/public"));

// set port and run server
var port = Number(process.env.VCAP_APP_PORT || 8080);
app.listen(port, function () {
    log.info("listening on port: %d", port);
});