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
const commandline_1 = require("../../../util/commandline");
const uitest_preparer_1 = require("../lib/uitest-preparer");
const prepare_tests_command_1 = require("../lib/prepare-tests-command");
const interaction_1 = require("../../../util/interaction");
const help_messages_1 = require("../lib/help-messages");
let PrepareUITestCommand = class PrepareUITestCommand extends prepare_tests_command_1.PrepareTestsCommand {
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
        });
    }
    prepareManifest() {
        const preparer = new uitest_preparer_1.UITestPreparer(this.artifactsDir, this.buildDir, this.appPath);
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
    getSourceRootDir() {
        return this.buildDir;
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.AppPath),
    commandline_1.longName("app-path"),
    commandline_1.required,
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "appPath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsBuildDir),
    commandline_1.longName("build-dir"),
    commandline_1.hasArg,
    commandline_1.required
], PrepareUITestCommand.prototype, "buildDir", void 0);
__decorate([
    commandline_1.help("Obsolete. Please use --build-dir instead"),
    commandline_1.longName("assembly-dir"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "assemblyDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsStoreFilePath),
    commandline_1.longName("store-path"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "storePath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsStorePassword),
    commandline_1.longName("store-password"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "storePassword", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsKeyAlias),
    commandline_1.longName("key-alias"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "keyAlias", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsKeyPassword),
    commandline_1.longName("key-password"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "keyPassword", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsSignInfo),
    commandline_1.longName("sign-info"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "signInfo", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.UITestsToolsDir),
    commandline_1.longName("uitest-tools-dir"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "uiTestToolsDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.Fixture),
    commandline_1.longName("fixture"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "fixture", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.IncludeCategory),
    commandline_1.longName("include-category"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "includeCategory", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.ExcludeCategory),
    commandline_1.longName("exclude-category"),
    commandline_1.hasArg
], PrepareUITestCommand.prototype, "excludeCategory", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.TestChunk),
    commandline_1.longName("test-chunk")
], PrepareUITestCommand.prototype, "testChunk", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.FixtureChunk),
    commandline_1.longName("fixture-chunk")
], PrepareUITestCommand.prototype, "fixtureChunk", void 0);
PrepareUITestCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.PrepareUITests)
], PrepareUITestCommand);
exports.default = PrepareUITestCommand;
