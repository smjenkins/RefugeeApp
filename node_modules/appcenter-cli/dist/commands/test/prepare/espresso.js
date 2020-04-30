"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("../../../util/commandline");
const espresso_preparer_1 = require("../lib/espresso-preparer");
const prepare_tests_command_1 = require("../lib/prepare-tests-command");
const help_messages_1 = require("../lib/help-messages");
let PrepareEspressoCommand = class PrepareEspressoCommand extends prepare_tests_command_1.PrepareTestsCommand {
    constructor(args) {
        super(args);
    }
    prepareManifest() {
        const preparer = new espresso_preparer_1.EspressoPreparer(this.artifactsDir, this.buildDir, this.testApkPath, this.include);
        return preparer.prepare();
    }
    getSourceRootDir() {
        return this.buildDir;
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.EspressoBuildDir),
    commandline_1.longName("build-dir"),
    commandline_1.hasArg
], PrepareEspressoCommand.prototype, "buildDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.EspressoTestApkPath),
    commandline_1.longName("test-apk-path"),
    commandline_1.hasArg
], PrepareEspressoCommand.prototype, "testApkPath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.NotSupported + " for Espresso"),
    commandline_1.longName("include"),
    commandline_1.hasArg
], PrepareEspressoCommand.prototype, "include", void 0);
PrepareEspressoCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.PrepareEspresso)
], PrepareEspressoCommand);
exports.default = PrepareEspressoCommand;
