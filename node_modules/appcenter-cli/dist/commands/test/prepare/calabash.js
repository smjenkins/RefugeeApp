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
const calabash_preparer_1 = require("../lib/calabash-preparer");
const prepare_tests_command_1 = require("../lib/prepare-tests-command");
const interaction_1 = require("../../../util/interaction");
const help_messages_1 = require("../lib/help-messages");
let PrepareCalabashCommand = class PrepareCalabashCommand extends prepare_tests_command_1.PrepareTestsCommand {
    constructor(args) {
        super(args);
    }
    validateOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.workspaceDir && !this.projectDir) {
                interaction_1.out.text("Argument --workspace is obsolete. Please use --project-dir instead.");
                this.projectDir = this.workspaceDir;
            }
            if (this.config && this.configPath) {
                throw new Error("Arguments --config-path and --config (obsolete) were both used. Please use only --config-path.");
            }
            if (this.config) {
                interaction_1.out.text("Argument --config is obsolete. Please use --config-path instead.");
                this.configPath = this.config;
            }
            if (!this.projectDir) {
                throw new Error("Argument --project-dir is required");
            }
        });
    }
    prepareManifest() {
        const preparer = new calabash_preparer_1.CalabashPreparer(this.artifactsDir, this.projectDir, this.appPath, this.testParameters);
        preparer.signInfo = this.signInfo;
        preparer.config = this.configPath;
        preparer.profile = this.profile;
        preparer.skipConfigCheck = this.skipConfigCheck;
        return preparer.prepare();
    }
    getSourceRootDir() {
        return this.projectDir;
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.AppPath),
    commandline_1.longName("app-path"),
    commandline_1.required,
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "appPath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.CalabashProjectDir),
    commandline_1.longName("project-dir"),
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "projectDir", void 0);
__decorate([
    commandline_1.help("Obsolete. Please use --project-dir instead"),
    commandline_1.longName("workspace"),
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "workspaceDir", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.CalabashSignInfo),
    commandline_1.longName("sign-info"),
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "signInfo", void 0);
__decorate([
    commandline_1.help("Obsolete. Please use --config-path instead"),
    commandline_1.longName("config"),
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "config", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.CalabashConfigPath),
    commandline_1.longName("config-path"),
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "configPath", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.CalabashProfile),
    commandline_1.longName("profile"),
    commandline_1.hasArg
], PrepareCalabashCommand.prototype, "profile", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.CalabashSkipConfigCheck),
    commandline_1.longName("skip-config-check")
], PrepareCalabashCommand.prototype, "skipConfigCheck", void 0);
PrepareCalabashCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.PrepareCalabash)
], PrepareCalabashCommand);
exports.default = PrepareCalabashCommand;
