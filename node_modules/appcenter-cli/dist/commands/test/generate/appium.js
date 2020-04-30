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
const generate_command_1 = require("../lib/generate-command");
const help_messages_1 = require("../lib/help-messages");
const path = require("path");
let GenerateAppiumCommand = class GenerateAppiumCommand extends generate_command_1.GenerateCommand {
    constructor(args) {
        super(args);
        this.templatePathAndroid = path.join(__dirname, "../lib/templates/appium/android");
        this.templatePathiOS = path.join(__dirname, "../lib/templates/appium/ios");
    }
    processTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
};
GenerateAppiumCommand = __decorate([
    commandline_1.help(help_messages_1.Messages.TestCloud.Commands.GenerateAppium)
], GenerateAppiumCommand);
exports.default = GenerateAppiumCommand;
