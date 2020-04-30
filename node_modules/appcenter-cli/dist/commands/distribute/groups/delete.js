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
const debug = require("debug")("appcenter-cli:commands:distribute:groups:delete");
let DeleteDistributionGroupCommand = class DeleteDistributionGroupCommand extends commandline_1.AppCommand {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            if (!(yield interaction_1.prompt.confirm(`Do you really want to delete distribution group ${this.distributionGroup}?`))) {
                interaction_1.out.text(`Deletion of distribution group ${this.distributionGroup} was cancelled`);
                return commandline_1.success();
            }
            try {
                const httpResponse = yield interaction_1.out.progress(`Removing the distribution group...`, apis_1.clientRequest((cb) => client.distributionGroups.deleteMethod(app.appName, app.ownerName, this.distributionGroup, cb)));
                if (httpResponse.response.statusCode >= 400) {
                    throw httpResponse.response.statusCode;
                }
            }
            catch (error) {
                if (error === 404) {
                    return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `distribution group ${this.distributionGroup} doesn't exists`);
                }
                else {
                    debug(`Failed to remove the distribution group - ${util_1.inspect(error)}`);
                    return commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to delete the distribution group`);
                }
            }
            interaction_1.out.text(`Distribution group ${this.distributionGroup} was deleted`);
            return commandline_1.success();
        });
    }
};
__decorate([
    commandline_1.help("Distribution group name"),
    commandline_1.shortName("g"),
    commandline_1.longName("group"),
    commandline_1.required,
    commandline_1.hasArg
], DeleteDistributionGroupCommand.prototype, "distributionGroup", void 0);
DeleteDistributionGroupCommand = __decorate([
    commandline_1.help("Deletes the distribution group")
], DeleteDistributionGroupCommand);
exports.default = DeleteDistributionGroupCommand;
