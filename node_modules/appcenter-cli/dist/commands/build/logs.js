"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DisplayLogsStatusCommand_1;
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("../../util/commandline");
const apis_1 = require("../../util/apis");
const interaction_1 = require("../../util/interaction");
const util_1 = require("util");
const _ = require("lodash");
const ContinuousPollingHelper = require("../../util/continuous-polling/continuous-polling-helper");
const debug = require("debug")("appcenter-cli:commands:build:logs");
let DisplayLogsStatusCommand = DisplayLogsStatusCommand_1 = class DisplayLogsStatusCommand extends commandline_1.AppCommand {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate build id
            const buildIdNumber = Number(this.buildId);
            if (!Number.isSafeInteger(buildIdNumber) || buildIdNumber < 1) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "build id should be positive integer");
            }
            // validate lines number
            let numberOfLines;
            if (!_.isNil(this.lines)) {
                numberOfLines = Number(this.lines);
                if (!Number.isSafeInteger(numberOfLines) || numberOfLines < 1) {
                    return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "number of lines should be positive integer");
                }
            }
            else {
                numberOfLines = Number.MAX_SAFE_INTEGER;
            }
            const app = this.app;
            const streamingOutput = new interaction_1.StreamingArrayOutput();
            streamingOutput.start();
            let skippedAndShownLogsCount;
            yield ContinuousPollingHelper.pollContinuously(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    debug(`Downloading logs for build ${this.buildId}`);
                    return yield apis_1.clientRequest((cb) => client.builds.getLog(buildIdNumber, app.ownerName, app.appName, cb));
                }
                catch (error) {
                    debug(`Request failed - ${util_1.inspect(error)}`);
                    switch (error.statusCode) {
                        case 401:
                            throw commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to get build logs because the authentication has failed");
                        case 404:
                            throw commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `failed to get build logs because build ${buildIdNumber} doesn't exist`);
                        default:
                            throw commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to get build logs");
                    }
                }
            }), (response, responsesProcessed) => {
                // processing response
                const logs = response.result.value;
                let filteredLogs;
                if (responsesProcessed) {
                    filteredLogs = _.drop(logs, skippedAndShownLogsCount);
                    skippedAndShownLogsCount += filteredLogs.length;
                }
                else {
                    filteredLogs = _.takeRight(logs, Math.min(numberOfLines, logs.length));
                    skippedAndShownLogsCount = logs.length;
                }
                if (!this.showContinuously && filteredLogs.length === 0) {
                    streamingOutput.text(_.constant(""), "No log entries were found");
                }
                else {
                    for (const log of filteredLogs) {
                        streamingOutput.text(_.constant(log), log);
                    }
                }
            }, this.showContinuously, DisplayLogsStatusCommand_1.delayBetweenRequests, `Downloading logs for build ${this.buildId}...`);
            streamingOutput.finish();
            return commandline_1.success();
        });
    }
};
DisplayLogsStatusCommand.delayBetweenRequests = 3000;
__decorate([
    commandline_1.help("ID of build to show logs for"),
    commandline_1.shortName("i"),
    commandline_1.longName("id"),
    commandline_1.required,
    commandline_1.hasArg
], DisplayLogsStatusCommand.prototype, "buildId", void 0);
__decorate([
    commandline_1.help("Number of last lines to be shown"),
    commandline_1.shortName("l"),
    commandline_1.longName("lines"),
    commandline_1.hasArg
], DisplayLogsStatusCommand.prototype, "lines", void 0);
__decorate([
    commandline_1.help("Continue to return logs, press Ctrl+C to exit"),
    commandline_1.shortName("c"),
    commandline_1.longName("continue")
], DisplayLogsStatusCommand.prototype, "showContinuously", void 0);
DisplayLogsStatusCommand = DisplayLogsStatusCommand_1 = __decorate([
    commandline_1.help("Displays log for build")
], DisplayLogsStatusCommand);
exports.default = DisplayLogsStatusCommand;
