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
const debug = require("debug")("appcenter-cli:commands:analytics:events:delete");
let DeleteCommand = class DeleteCommand extends commandline_1.AppCommand {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            try {
                yield interaction_1.out.progress("Deleting event...", apis_1.clientRequest((cb) => client.analytics.eventsDelete(this.eventName, app.ownerName, app.appName, cb)));
            }
            catch (error) {
                debug(`Failed to delete event ${this.eventName} - ${util_1.inspect(error)}`);
                throw commandline_1.failure(commandline_1.ErrorCodes.Exception, `failed to delete event ${this.eventName}`);
            }
            interaction_1.out.text(`Successfully deleted ${this.eventName} for this app`);
            return commandline_1.success();
        });
    }
};
__decorate([
    commandline_1.help("Name of event to delete"),
    commandline_1.shortName("n"),
    commandline_1.longName("event-name"),
    commandline_1.hasArg,
    commandline_1.required
], DeleteCommand.prototype, "eventName", void 0);
DeleteCommand = __decorate([
    commandline_1.help("Delete event")
], DeleteCommand);
exports.default = DeleteCommand;
