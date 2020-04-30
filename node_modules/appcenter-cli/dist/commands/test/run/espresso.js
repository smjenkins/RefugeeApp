"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("../../../util/commandline");
const run_tests_command_1 = require("../lib/run-tests-command");
const espresso_preparer_1 = require("../lib/espresso-preparer");
const help_messages_1 = require("../lib/help-messages");
let RunEspressoTestsCommand = class RunEspressoTestsCommand extends run_tests_command_1.RunTestsCommand {
    constructor(args) {
        super(args);
    }
    prepareManifest(artifactsDir) {
        if (!this.appPath) {
            throw new Error("Argument --app-path is required");
        }
        const preparer = new espresso_preparer_1.EspressoPreparer(artifactsDir, this.buildDir, this.testApkPath, this.include);
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
], RunEspressoTestsCommand.prototype, "buildDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.EspressoTestApkPath),
    commandline_1.longName("test-apk-path"),
    commandline_1.hasArg
], RunEspressoTestsCommand.prototype, "testApkPath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.NotSupported + " for Espresso"),
    commandline_1.longName("include"),
    commandline_1.hasArg
], RunEspressoTestsCommand.prototype, "include", void 0);
RunEspressoTestsCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.RunEspresso)
], RunEspressoTestsCommand);
exports.default = RunEspressoTestsCommand;
