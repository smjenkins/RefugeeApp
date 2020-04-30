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
const pfs = require("../../../util/misc/promisfied-fs");
const path = require("path");
const fs_helper_1 = require("../../../util/misc/fs-helper");
const commandline_1 = require("../../../util/commandline");
const appium_preparer_1 = require("../lib/appium-preparer");
const help_messages_1 = require("../lib/help-messages");
const junit_xml_util_1 = require("../lib/junit-xml-util");
const run_tests_download_result_command_1 = require("../lib/run-tests-download-result-command");
let RunAppiumTestsCommand = class RunAppiumTestsCommand extends run_tests_download_result_command_1.RunTestsDownloadResultCommand {
    constructor(args) {
        super(args);
    }
    prepareManifest(artifactsDir) {
        const preparer = new appium_preparer_1.AppiumPreparer(artifactsDir, this.buildDir);
        return preparer.prepare();
    }
    getSourceRootDir() {
        return this.buildDir;
    }
    validateOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.testOutputDir && this.mergeJUnitXml) {
                throw new Error("Argument --test-output-dir is required for argument --merge-junit-xml");
            }
        });
    }
    mergeTestArtifacts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mergeJUnitXml) {
                return;
            }
            const reportPath = fs_helper_1.generateAbsolutePath(this.testOutputDir);
            if (!reportPath) {
                return;
            }
            const xmlUtil = new junit_xml_util_1.JUnitXmlUtil();
            const pathToArchive = path.join(reportPath, xmlUtil.getArchiveName());
            const xml = yield xmlUtil.mergeXmlResults(pathToArchive);
            if (!xml) {
                throw new Error(`Couldn't merge xml test results to ${this.mergeJUnitXml}`);
            }
            return pfs.writeFile(path.join(reportPath, this.mergeJUnitXml), xml);
        });
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.AppiumBuildDir),
    commandline_1.longName("build-dir"),
    commandline_1.hasArg,
    commandline_1.required
], RunAppiumTestsCommand.prototype, "buildDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.MergeJUnitXml),
    commandline_1.longName("merge-junit-xml"),
    commandline_1.hasArg
], RunAppiumTestsCommand.prototype, "mergeJUnitXml", void 0);
RunAppiumTestsCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.RunAppium)
], RunAppiumTestsCommand);
exports.default = RunAppiumTestsCommand;
