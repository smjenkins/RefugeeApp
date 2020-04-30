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
const state_checker_1 = require("./lib/state-checker");
const help_messages_1 = require("./lib/help-messages");
let StatusCommand = class StatusCommand extends commandline_1.AppCommand {
    constructor(args) {
        super(args);
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new state_checker_1.StateChecker(client, this.testRunId, this.app.ownerName, this.app.appName);
            const exitCode = this.continuous ? yield checker.checkUntilCompleted() : yield checker.checkOnce();
            if (!exitCode) {
                return commandline_1.success();
            }
            else {
                return commandline_1.failure(exitCode, `Test run failed. Returning exit code ${exitCode}.`);
            }
        });
    }
};
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.StatusTestRunId),
    commandline_1.longName("test-run-id"),
    commandline_1.required,
    commandline_1.hasArg
], StatusCommand.prototype, "testRunId", void 0);
__decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Arguments.StatusContinuous),
    commandline_1.longName("continuous"),
    commandline_1.shortName("c")
], StatusCommand.prototype, "continuous", void 0);
StatusCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.Status)
], StatusCommand);
exports.default = StatusCommand;
