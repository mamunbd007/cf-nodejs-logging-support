const uuid = require("uuid/v4");

const Logger = require("./logger");
const logFactory = require("./log-factory");
const ExpressRequestWrapper = require("./wrapper/express-request-wrapper");
const ExpressResponseWrapper = require("./wrapper/express-response-wrapper");

const LOG_TYPE = "request";
const LOG_DIRECTION = "IN";
const LOG_LEVEL = "info";
const DEFAULT_DASH = "-";
const REDACTION_PLACEHOLDER = "redacted";

class NetworkLogger extends Logger {
    constructor(parent) {
        super(false, parent, {});
    }

    logNetwork(req, res, next) {
        var self = this;
        var framework = "express"; // TODO: read from somewhere

        this._attachAPI(req);
        this.log = logFactory.createLog();

        var wReq = this._createRequestWrapper(framework, req);
        var wRes = this._createResponseWrapper(framework, res);

        this.correlationData = this._createCorrelationData(wReq);

        this.log.addData({
            type: LOG_TYPE,
            direction: LOG_DIRECTION,
            level: LOG_LEVEL,
            request: wReq.getURL(DEFAULT_DASH),
            method: wReq.getMethod(DEFAULT_DASH),
            remote_host: wReq.getRemoteHost(DEFAULT_DASH), // TODO: ENV LOG_SENSITIVE_CONNECTION_DATA
            remote_ip: wReq.getRemoteHost(DEFAULT_DASH), // TODO: ENV LOG_SENSITIVE_CONNECTION_DATA
            remote_port: wReq.getRemotePort(DEFAULT_DASH), // TODO: ENV LOG_SENSITIVE_CONNECTION_DATA
            remote_user: wReq.getHeader("remote-user", DEFAULT_DASH), // TODO: ENV LOG_REMOTE_USER
            request_received_at: this.log.data.written_at,
            request_size_b: wReq.getHeader("content-length", -1),
            protocol: wReq.getProtocol(),
            referer: wReq.getHeader("referer", DEFAULT_DASH), // TODO: ENV LOG_REFERER
            x_forwarded_for: wReq.getHeader("x-forwarded-for", ""), // TODO: ENV LOG_SENSITIVE_CONNECTION_DATA
            correlation_id: this.correlationData.correlation_id,
            tenant_id: this.correlationData.tenant_id,
            request_id: this.correlationData.request_id,
            response_time_ms: Date.now(),
        }, true);

        wRes.setSendCallback(function (r) {
            self.log.addData({
                response_status: wRes.getStatusCode(200),
                response_size_b: wReq.getHeader("content-length", -1),
                response_content_type: wReq.getHeader("content-type", DEFAULT_DASH),
                response_time_ms: Date.now() - self.log.data.response_time_ms,
                response_sent_at: (new Date()).toJSON()
            }, true);

            // add custom field data to log
            self.log.addCustomFieldData(self._getOwnAndAncestorsCustomFields());

            // TODO: use proper writer
            console.log(JSON.stringify(self.log.getData()));
        });


        if (next && typeof next === "function") {
            next();
        }
    }

    _attachAPI(req) {
        req.logger = this;
        req.getLogger = function () { this.logger };
        req.createLogger = function (customFields) { this.logger.createLogger.apply(this.logger, customFields); };
    }

    _createRequestWrapper(framework, req) {
        switch (framework) {
            case "express":
                return new ExpressRequestWrapper(req);
        }
    }

    _createResponseWrapper(framework, res) {
        switch (framework) {
            case "express":
                return new ExpressResponseWrapper(res);
        }
    }

    _createCorrelationData(wReq) {
        var requestId = wReq.getHeader("x-vcap-request-id", DEFAULT_DASH);
        var tenantId = wReq.getHeader("tenantid", DEFAULT_DASH);
        var correlationId = wReq.getHeader("x-correlationid", (requestId != null && requestId != DEFAULT_DASH) ? requestId : uuid());

        return {
            correlation_id: correlationId,
            tenant_id: tenantId,
            request_id: requestId
        };
    }
}

module.exports = NetworkLogger;