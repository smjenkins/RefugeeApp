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
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("../../util/commandline");
const interaction_1 = require("../../util/interaction");
const download_1 = require("../../util/misc/download");
const fs_helper_1 = require("../../util/misc/fs-helper");
const pfs = require("../../util/misc/promisfied-fs");
const profile_1 = require("../../util/profile");
const help_messages_1 = require("./lib/help-messages");
const state_checker_1 = require("./lib/state-checker");
const error_info_builder_1 = require("./lib/error-info-builder");
const xml_util_builder_1 = require("./lib/xml-util-builder");
const path = require("path");
let DownloadTestsCommand = class DownloadTestsCommand extends commandline_1.AppCommand {
    constructor(args) {
        super(args);
        this.streamingOutput = new interaction_1.StreamingArrayOutput();
    }
    run(client, portalBaseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.streamingOutput.start();
                const checker = new state_checker_1.StateChecker(client, this.testRunId, this.app.ownerName, this.app.appName, this.streamingOutput);
                if (this.continuous) {
                    yield checker.checkUntilCompleted();
                }
                else {
                    const result = yield checker.checkOnce();
                    // undefined - in progress (validation, running, etc)
                    if (typeof result === "undefined") {
                        return commandline_1.failure(1, `The test run ${this.testRunId} is not complete, please try again once the test has completed successfully`);
                    }
                }
                const testReport = yield client.test.getTestReport(this.testRunId, this.app.ownerName, this.app.appName);
                if (!testReport.stats.artifacts) {
                    return commandline_1.failure(commandline_1.ErrorCodes.Exception, "XML reports have not been created");
                }
                yield download_1.downloadArtifacts(this, this.streamingOutput, this.testOutputDir, this.testRunId, testReport.stats.artifacts);
                if (this.outputXmlName) {
                    const xmlUtil = xml_util_builder_1.XmlUtilBuilder.buildXmlUtil(testReport.stats.artifacts);
                    const outputDir = fs_helper_1.generateAbsolutePath(this.testOutputDir);
                    const pathToArchive = path.join(outputDir, xmlUtil.getArchiveName());
                    const xml = yield xmlUtil.mergeXmlResults(pathToArchive);
                    if (!xml) {
                        return commandline_1.failure(commandline_1.ErrorCodes.Exception, "XML merging has ended with an error");
                    }
                    const xmlPath = path.join(outputDir, this.outputXmlName);
                    yield pfs.writeFile(xmlPath, xml);
                    this.streamingOutput.text((command) => {
                        return `Merged test results to ${xmlPath}`;
                    }, this);
                }
                return commandline_1.success();
            }
            catch (err) {
                const errInfo = error_info_builder_1.buildErrorInfo(err, profile_1.getUser(), this);
                return commandline_1.failure(errInfo.exitCode, errInfo.message);
            }
            finally {
                this.streamingOutput.finish();
            }
        });
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.DownloadTestRunId),
    commandline_1.longName("test-run-id"),
    commandline_1.hasArg,
    commandline_1.required
], DownloadTestsCommand.prototype, "testRunId", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.DownloadTestOutputDir),
    commandline_1.longName("test-output-dir"),
    commandline_1.hasArg,
    commandline_1.required
], DownloadTestsCommand.prototype, "testOutputDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.MergedFileName),
    commandline_1.longName("merged-file-name"),
    commandline_1.hasArg
], DownloadTestsCommand.prototype, "outputXmlName", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.Continuous),
    commandline_1.shortName("c"),
    commandline_1.longName("continuous")
], DownloadTestsCommand.prototype, "continuous", void 0);
DownloadTestsCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.Download)
], DownloadTestsCommand);
exports.default = DownloadTestsCommand;
