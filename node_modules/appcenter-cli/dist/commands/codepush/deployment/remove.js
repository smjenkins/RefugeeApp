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
const apis_1 = require("../../../util/apis");
const interaction_1 = require("../../../util/interaction");
const util_1 = require("util");
const debug = require("debug")("appcenter-cli:commands:codepush:deployment:remove");
let CodePushRemoveDeploymentCommand = class CodePushRemoveDeploymentCommand extends commandline_1.AppCommand {
    constructor(args) {
        super(args);
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            if (!(yield interaction_1.prompt.confirm(`Do you really want to remove deployment ${this.deploymentName}?`))) {
                interaction_1.out.text(`Removing of deployment ${this.deploymentName} was cancelled`);
                return commandline_1.success();
            }
            try {
                debug("Removing CodePush deployment");
                yield interaction_1.out.progress(`Removing CodePush deployment...`, apis_1.clientRequest((cb) => client.codePushDeployments.deleteMethod(this.deploymentName, app.ownerName, app.appName, cb)));
            }
            catch (error) {
                debug(`Failed to remove CodePush deployment - ${util_1.inspect(error)}`);
                if (error.statusCode === 404) {
                    const appNotFoundErrorMsg = `Deployment ${this.deploymentName} for the ${this.identifier} app does not exist.`;
                    return commandline_1.failure(commandline_1.ErrorCodes.NotFound, appNotFoundErrorMsg);
                }
                else {
                    return commandline_1.failure(commandline_1.ErrorCodes.Exception, error.response.body);
                }
            }
            interaction_1.out.text(`Successfully removed the ${this.deploymentName} deployment for the ${this.identifier} app.`);
            return commandline_1.success();
        });
    }
};
__decorate([
    commandline_1.help("Specifies CodePush deployment name to be removed"),
    commandline_1.name("deployment-name"),
    commandline_1.position(0),
    commandline_1.required
], CodePushRemoveDeploymentCommand.prototype, "deploymentName", void 0);
CodePushRemoveDeploymentCommand = __decorate([
    commandline_1.help("Remove CodePush deployment")
], CodePushRemoveDeploymentCommand);
exports.default = CodePushRemoveDeploymentCommand;
