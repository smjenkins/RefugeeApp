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
const commandline_1 = require("../util/commandline");
const misc_1 = require("../util/misc");
const debug = require("debug")("appcenter-cli:commands:help");
const util_1 = require("util");
let HelpCommand = class HelpCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.version) {
                return this.showVersion();
            }
            debug(`Getting help for "${util_1.inspect(this.commandToGetHelpFor)}"`);
            // Try to load help for the command in question
            // We just load the command and run the help
            const cmdRunner = commandline_1.runner(__dirname);
            const result = !this.commandToGetHelpFor ? yield cmdRunner([]) : yield cmdRunner(this.commandToGetHelpFor.concat(["-h"]));
            if (commandline_1.isCommandFailedResult(result) && result.errorCode === commandline_1.ErrorCodes.NoSuchCommand) {
                return commandline_1.failure(commandline_1.ErrorCodes.NoSuchCommand, `command ${this.commandToGetHelpFor.join(" ")} doesn't exist`);
            }
            else {
                return result;
            }
        });
    }
};
__decorate([
    commandline_1.name("command..."),
    commandline_1.position(null),
    commandline_1.help("Command to get help on")
], HelpCommand.prototype, "commandToGetHelpFor", void 0);
HelpCommand = __decorate([
    commandline_1.help(`Get help using ${misc_1.scriptName} commands`)
], HelpCommand);
exports.default = HelpCommand;
