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
const apis_1 = require("../../util/apis");
const interaction_1 = require("../../util/interaction");
const util_1 = require("util");
const debug = require("debug")("appcenter-cli:commands:codepush:rollback");
let CodePushRollbackCommand = class CodePushRollbackCommand extends commandline_1.AppCommand {
    constructor(args) {
        super(args);
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            if (!(yield interaction_1.prompt.confirm(`Do you really want to rollback release for deployment '${this.deploymentName}'?`))) {
                interaction_1.out.text(`Rollback of deployment '${this.deploymentName}' was cancelled`);
                return commandline_1.success();
            }
            try {
                debug("Rollback CodePush release");
                yield interaction_1.out.progress("Rollback CodePush release...", apis_1.clientRequest((cb) => client.codePushDeploymentRelease.rollback(this.deploymentName, app.ownerName, app.appName, { label: this.targetRelease }, cb)));
            }
            catch (error) {
                debug(`Failed to rollback CodePush release - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, error.response.body);
            }
            interaction_1.out.text(`Successfully performed a rollback on the '${this.deploymentName}' deployment of the '${this.identifier}' app.`);
            return commandline_1.success();
        });
    }
};
__decorate([
    commandline_1.help("Specifies deployment name to be rolled back"),
    commandline_1.required,
    commandline_1.name("deployment-name"),
    commandline_1.position(0)
], CodePushRollbackCommand.prototype, "deploymentName", void 0);
__decorate([
    commandline_1.help("Specifies the release label to be rolled back"),
    commandline_1.longName("target-release"),
    commandline_1.hasArg
], CodePushRollbackCommand.prototype, "targetRelease", void 0);
CodePushRollbackCommand = __decorate([
    commandline_1.help("Rollback a deployment to a previous release")
], CodePushRollbackCommand);
exports.default = CodePushRollbackCommand;
