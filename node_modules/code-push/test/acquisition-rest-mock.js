/// <reference path="../definitions/harness.d.ts" />
var querystring = require("querystring");
var acquisitionSdk = require("../script/acquisition-sdk");
exports.validDeploymentKey = "asdfasdfawerqw";
exports.latestPackage = {
    download_url: "http://www.windowsazure.com/blobs/awperoiuqpweru",
    description: "Angry flappy birds",
    target_binary_range: "1.5.0",
    label: "2.4.0",
    is_mandatory: false,
    is_available: true,
    update_app_version: false,
    package_hash: "hash240",
    package_size: 1024
};
exports.serverUrl = "http://myurl.com";
var publicPrefixUrl = "/v0.1/public/codepush";
var reportStatusDeployUrl = exports.serverUrl + publicPrefixUrl + "/report_status/deploy";
var reportStatusDownloadUrl = exports.serverUrl + publicPrefixUrl + "/report_status/download";
var updateCheckUrl = exports.serverUrl + publicPrefixUrl + "/update_check?";
var HttpRequester = (function () {
    function HttpRequester() {
    }
    HttpRequester.prototype.request = function (verb, url, requestBodyOrCallback, callback) {
        if (!callback && typeof requestBodyOrCallback === "function") {
            callback = requestBodyOrCallback;
        }
        if (verb === 0 /* GET */ && url.indexOf(updateCheckUrl) === 0) {
            var params = querystring.parse(url.substring(updateCheckUrl.length));
            Server.onUpdateCheck(params, callback);
        }
        else if (verb === 2 /* POST */ && url === reportStatusDeployUrl) {
            Server.onReportStatus(callback);
        }
        else if (verb === 2 /* POST */ && url === reportStatusDownloadUrl) {
            Server.onReportStatus(callback);
        }
        else {
            throw new Error("Unexpected call");
        }
    };
    return HttpRequester;
})();
exports.HttpRequester = HttpRequester;
var CustomResponseHttpRequester = (function () {
    function CustomResponseHttpRequester(response) {
        this.response = response;
    }
    CustomResponseHttpRequester.prototype.request = function (verb, url, requestBodyOrCallback, callback) {
        if (typeof requestBodyOrCallback !== "function") {
            throw new Error("Unexpected request body");
        }
        callback = requestBodyOrCallback;
        callback(null, this.response);
    };
    return CustomResponseHttpRequester;
})();
exports.CustomResponseHttpRequester = CustomResponseHttpRequester;
var Server = (function () {
    function Server() {
    }
    Server.onAcquire = function (params, callback) {
        if (params.deploymentKey !== exports.validDeploymentKey) {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ update_info: { isAvailable: false } })
            });
        }
        else {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ update_info: exports.latestPackage })
            });
        }
    };
    Server.onUpdateCheck = function (params, callback) {
        var updateRequest = {
            deployment_key: params.deployment_key,
            app_version: params.app_version,
            package_hash: params.package_hash,
            is_companion: !!(params.is_companion),
            label: params.label
        };
        if (!updateRequest.deployment_key || !updateRequest.app_version) {
            callback(null, { statusCode: 400 });
        }
        else {
            var updateInfo = { is_available: false };
            if (updateRequest.deployment_key === exports.validDeploymentKey) {
                if (updateRequest.is_companion || updateRequest.app_version === exports.latestPackage.target_binary_range) {
                    if (updateRequest.package_hash !== exports.latestPackage.package_hash) {
                        updateInfo = exports.latestPackage;
                    }
                }
                else if (updateRequest.app_version < exports.latestPackage.target_binary_range) {
                    updateInfo = { update_app_version: true, target_binary_range: exports.latestPackage.target_binary_range };
                }
            }
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({ update_info: updateInfo })
            });
        }
    };
    Server.onReportStatus = function (callback) {
        callback(null, { statusCode: 200 });
    };
    return Server;
})();

//# sourceMappingURL=acquisition-rest-mock.js.map
