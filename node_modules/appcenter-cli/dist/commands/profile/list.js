"use strict";
// profile list command
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
const interaction_1 = require("../../util/interaction");
const apis_1 = require("../../util/apis");
const format_profile_1 = require("./lib/format-profile");
let ProfileListCommand = class ProfileListCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield interaction_1.out.progress("Getting user information...", apis_1.clientCall((cb) => client.users.get(cb)));
            format_profile_1.reportProfile(userInfo);
            return commandline_1.success();
        });
    }
};
ProfileListCommand = __decorate([
    commandline_1.help("Get information about logged in user")
], ProfileListCommand);
exports.default = ProfileListCommand;
