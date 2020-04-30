"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("../../../util/commandline");
const appium_preparer_1 = require("../lib/appium-preparer");
const prepare_tests_command_1 = require("../lib/prepare-tests-command");
const help_messages_1 = require("../lib/help-messages");
let PrepareAppiumCommand = class PrepareAppiumCommand extends prepare_tests_command_1.PrepareTestsCommand {
    constructor(args) {
        super(args);
    }
    prepareManifest() {
        const preparer = new appium_preparer_1.AppiumPreparer(this.artifactsDir, this.buildDir);
        return preparer.prepare();
    }
    getSourceRootDir() {
        return this.buildDir;
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.AppiumBuildDir),
    commandline_1.longName("build-dir"),
    commandline_1.hasArg,
    commandline_1.required
], PrepareAppiumCommand.prototype, "buildDir", void 0);
PrepareAppiumCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.PrepareAppium)
], PrepareAppiumCommand);
exports.default = PrepareAppiumCommand;
