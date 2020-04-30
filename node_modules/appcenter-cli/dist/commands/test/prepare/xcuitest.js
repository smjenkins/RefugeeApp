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
const xcuitest_preparer_1 = require("../lib/xcuitest-preparer");
const prepare_tests_command_1 = require("../lib/prepare-tests-command");
const help_messages_1 = require("../lib/help-messages");
let PrepareXCUITestCommand = class PrepareXCUITestCommand extends prepare_tests_command_1.PrepareTestsCommand {
    constructor(args) {
        super(args);
    }
    prepareManifest() {
        const preparer = new xcuitest_preparer_1.XCUITestPreparer(this.artifactsDir, this.buildDir, this.testIpaPath, this.include);
        return preparer.prepare();
    }
    getSourceRootDir() {
        return this.buildDir;
    }
    validateOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.buildDir && this.testIpaPath) {
                throw Error("--build-dir cannot be used with --test-ipa-path");
            }
            if (!(this.buildDir || this.testIpaPath)) {
                throw Error("--build-dir or --test-ipa-path is required");
            }
        });
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.XCUITestBuildDir),
    commandline_1.longName("build-dir"),
    commandline_1.hasArg
], PrepareXCUITestCommand.prototype, "buildDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.XCUITestIpaPath),
    commandline_1.longName("test-ipa-path"),
    commandline_1.hasArg
], PrepareXCUITestCommand.prototype, "testIpaPath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.NotSupported + " for XCUITest"),
    commandline_1.longName("include"),
    commandline_1.hasArg
], PrepareXCUITestCommand.prototype, "include", void 0);
PrepareXCUITestCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.PrepareXCUITest)
], PrepareXCUITestCommand);
exports.default = PrepareXCUITestCommand;
