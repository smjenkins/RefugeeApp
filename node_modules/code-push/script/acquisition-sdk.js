/// <reference path="../definitions/harness.d.ts" />
var AcquisitionStatus = (function () {
    function AcquisitionStatus() {
    }
    AcquisitionStatus.DeploymentSucceeded = "DeploymentSucceeded";
    AcquisitionStatus.DeploymentFailed = "DeploymentFailed";
    return AcquisitionStatus;
})();
exports.AcquisitionStatus = AcquisitionStatus;
var AcquisitionManager = (function () {
    function AcquisitionManager(httpRequester, configuration) {
        this._publicPrefixUrl = "v0.1/public/codepush/";
        this._httpRequester = httpRequester;
        this._serverUrl = configuration.serverUrl;
        if (this._serverUrl.slice(-1) !== "/") {
            this._serverUrl += "/";
        }
        this._appVersion = configuration.appVersion;
        this._clientUniqueId = configuration.clientUniqueId;
        this._deploymentKey = configuration.deploymentKey;
        this._ignoreAppVersion = configuration.ignoreAppVersion;
    }
    AcquisitionManager.prototype.queryUpdateWithCurrentPackage = function (currentPackage, callback) {
        var _this = this;
        if (!currentPackage || !currentPackage.appVersion) {
            throw new Error("Calling common acquisition SDK with incorrect package"); // Unexpected; indicates error in our implementation
        }
        var updateRequest = {
            deployment_key: this._deploymentKey,
            app_version: currentPackage.appVersion,
            package_hash: currentPackage.packageHash,
            is_companion: this._ignoreAppVersion,
            label: currentPackage.label,
            client_unique_id: this._clientUniqueId
        };
        var requestUrl = this._serverUrl + this._publicPrefixUrl + "update_check?" + queryStringify(updateRequest);
        this._httpRequester.request(0 /* GET */, requestUrl, function (error, response) {
            if (error) {
                callback(error, null);
                return;
            }
            if (response.statusCode !== 200) {
                var errorMessage;
                if (response.statusCode === 0) {
                    errorMessage = "Couldn't send request to " + requestUrl + ", xhr.statusCode = 0 was returned. One of the possible reasons for that might be connection problems. Please, check your internet connection.";
                }
                else {
                    errorMessage = response.statusCode + ": " + response.body;
                }
                callback(new Error(errorMessage), null);
                return;
            }
            try {
                var responseObject = JSON.parse(response.body);
                var updateInfo = responseObject.update_info;
            }
            catch (error) {
                callback(error, null);
                return;
            }
            if (!updateInfo) {
                callback(error, null);
                return;
            }
            else if (updateInfo.update_app_version) {
                callback(null, { updateAppVersion: true, appVersion: updateInfo.target_binary_range });
                return;
            }
            else if (!updateInfo.is_available) {
                callback(null, null);
                return;
            }
            var remotePackage = {
                deploymentKey: _this._deploymentKey,
                description: updateInfo.description,
                label: updateInfo.label,
                appVersion: updateInfo.target_binary_range,
                isMandatory: updateInfo.is_mandatory,
                packageHash: updateInfo.package_hash,
                packageSize: updateInfo.package_size,
                downloadUrl: updateInfo.download_url
            };
            callback(null, remotePackage);
        });
    };
    AcquisitionManager.prototype.reportStatusDeploy = function (deployedPackage, status, previousLabelOrAppVersion, previousDeploymentKey, callback) {
        var url = this._serverUrl + this._publicPrefixUrl + "report_status/deploy";
        var body = {
            app_version: this._appVersion,
            deployment_key: this._deploymentKey
        };
        if (this._clientUniqueId) {
            body.client_unique_id = this._clientUniqueId;
        }
        if (deployedPackage) {
            body.label = deployedPackage.label;
            body.app_version = deployedPackage.appVersion;
            switch (status) {
                case AcquisitionStatus.DeploymentSucceeded:
                case AcquisitionStatus.DeploymentFailed:
                    body.status = status;
                    break;
                default:
                    if (callback) {
                        if (!status) {
                            callback(new Error("Missing status argument."), null);
                        }
                        else {
                            callback(new Error("Unrecognized status \"" + status + "\"."), null);
                        }
                    }
                    return;
            }
        }
        if (previousLabelOrAppVersion) {
            body.previous_label_or_app_version = previousLabelOrAppVersion;
        }
        if (previousDeploymentKey) {
            body.previous_deployment_key = previousDeploymentKey;
        }
        callback = typeof arguments[arguments.length - 1] === "function" && arguments[arguments.length - 1];
        this._httpRequester.request(2 /* POST */, url, JSON.stringify(body), function (error, response) {
            if (callback) {
                if (error) {
                    callback(error, null);
                    return;
                }
                if (response.statusCode !== 200) {
                    callback(new Error(response.statusCode + ": " + response.body), null);
                    return;
                }
                callback(null, null);
            }
        });
    };
    AcquisitionManager.prototype.reportStatusDownload = function (downloadedPackage, callback) {
        var url = this._serverUrl + this._publicPrefixUrl + "report_status/download";
        var body = {
            client_unique_id: this._clientUniqueId,
            deployment_key: this._deploymentKey,
            label: downloadedPackage.label
        };
        this._httpRequester.request(2 /* POST */, url, JSON.stringify(body), function (error, response) {
            if (callback) {
                if (error) {
                    callback(error, null);
                    return;
                }
                if (response.statusCode !== 200) {
                    callback(new Error(response.statusCode + ": " + response.body), null);
                    return;
                }
                callback(null, null);
            }
        });
    };
    return AcquisitionManager;
})();
exports.AcquisitionManager = AcquisitionManager;
function queryStringify(object) {
    var queryString = "";
    var isFirst = true;
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            var value = object[property];
            if (value !== null && typeof value !== "undefined") {
                if (!isFirst) {
                    queryString += "&";
                }
                queryString += encodeURIComponent(property) + "=";
                queryString += encodeURIComponent(value);
            }
            isFirst = false;
        }
    }
    return queryString;
}

//# sourceMappingURL=acquisition-sdk.js.map
