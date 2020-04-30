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
const fs_helper_1 = require("../../../util/misc/fs-helper");
const path = require("path");
const nunit_xml_util_1 = require("../lib/nunit-xml-util");
const commandline_1 = require("../../../util/commandline");
const uitest_preparer_1 = require("../lib/uitest-preparer");
const help_messages_1 = require("../lib/help-messages");
const interaction_1 = require("../../../util/interaction");
const run_tests_download_result_command_1 = require("../lib/run-tests-download-result-command");
let RunUITestsCommand = class RunUITestsCommand extends run_tests_download_result_command_1.RunTestsDownloadResultCommand {
    constructor(args) {
        super(args);
        this.fixture = this.fixArrayParameter(this.fixture);
        this.includeCategory = this.fixArrayParameter(this.includeCategory);
        this.excludeCategory = this.fixArrayParameter(this.excludeCategory);
    }
    validateOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.assemblyDir && !this.buildDir) {
                interaction_1.out.text("Argument --assembly-dir is obsolete. Please use --build-dir instead.");
                this.buildDir = this.assemblyDir;
            }
            if (!this.buildDir) {
                throw new Error("Argument --build-dir is required.");
            }
            if (this.testChunk && this.fixtureChunk) {
                throw new Error("Arguments --fixture-chunk and test-chunk cannot be combined.");
            }
            if (!this.testOutputDir && this.mergeNUnitXml) {
                throw new Error("Argument --test-output-dir is required for argument --merge-nunit-xml");
            }
        });
    }
    prepareManifest(artifactsDir) {
        const preparer = new uitest_preparer_1.UITestPreparer(artifactsDir, this.buildDir, this.appPath);
        preparer.storeFile = this.storePath;
        preparer.storePassword = this.storePassword;
        preparer.keyAlias = this.keyAlias;
        preparer.keyPassword = this.keyPassword;
        preparer.signInfo = this.signInfo;
        preparer.uiTestToolsDir = this.uiTestToolsDir;
        preparer.fixture = this.fixture;
        preparer.includeCategory = this.includeCategory;
        preparer.excludeCategory = this.excludeCategory;
        preparer.testChunk = this.testChunk;
        preparer.fixtureChunk = this.fixtureChunk;
        return preparer.prepare();
    }
    getParametersFromOptions() {
        if (this.fixtureChunk) {
            return { chunker: "fixture" };
        }
        else if (this.testChunk) {
            return { chunker: "method" };
        }
        return {};
    }
    getSourceRootDir() {
        return this.buildDir;
    }
    mergeTestArtifacts() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.mergeNUnitXml) {
                return;
            }
            const reportPath = fs_helper_1.generateAbsolutePath(this.testOutputDir);
            if (!reportPath) {
                return;
            }
            const xmlUtil = new nunit_xml_util_1.NUnitXmlUtil();
            const pathToArchive = path.join(reportPath, xmlUtil.getArchiveName());
            const xml = yield xmlUtil.mergeXmlResults(pathToArchive);
            if (!xml) {
                throw new Error(`Couldn't merge xml test results to ${this.mergeNUnitXml}`);
            }
            return pfs.writeFile(path.join(reportPath, this.mergeNUnitXml), xml);
        });
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsBuildDir),
    commandline_1.longName("build-dir"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "buildDir", void 0);
__decorate([
    commandline_1.help("Obsolete. Please use --build-dir instead"),
    commandline_1.longName("assembly-dir"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "assemblyDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsStoreFilePath),
    commandline_1.longName("store-path"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "storePath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsStorePassword),
    commandline_1.longName("store-password"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "storePassword", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsKeyAlias),
    commandline_1.longName("key-alias"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "keyAlias", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsKeyPassword),
    commandline_1.longName("key-password"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "keyPassword", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsSignInfo),
    commandline_1.longName("sign-info"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "signInfo", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsToolsDir),
    commandline_1.longName("uitest-tools-dir"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "uiTestToolsDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.Fixture),
    commandline_1.longName("fixture"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "fixture", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.IncludeCategory),
    commandline_1.longName("include-category"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "includeCategory", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.ExcludeCategory),
    commandline_1.longName("exclude-category"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "excludeCategory", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.MergeNUnitXml),
    commandline_1.longName("merge-nunit-xml"),
    commandline_1.hasArg
], RunUITestsCommand.prototype, "mergeNUnitXml", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.TestChunk),
    commandline_1.longName("test-chunk")
], RunUITestsCommand.prototype, "testChunk", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.FixtureChunk),
    commandline_1.longName("fixture-chunk")
], RunUITestsCommand.prototype, "fixtureChunk", void 0);
RunUITestsCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.RunUITests)
], RunUITestsCommand);
exports.default = RunUITestsCommand;
