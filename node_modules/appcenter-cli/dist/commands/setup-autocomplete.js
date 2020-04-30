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
var SetupAutoCompleteCommand_1;
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("../util/commandline");
const _ = require("lodash");
const Path = require("path");
const mkdirp = require("mkdirp");
const Process = require("process");
const autocomplete_1 = require("../util/commandline/autocomplete");
const interaction_1 = require("../util/interaction");
let SetupAutoCompleteCommand = SetupAutoCompleteCommand_1 = class SetupAutoCompleteCommand extends commandline_1.Command {
    runNoClient() {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isNil(this.shellProfilePath) && !_.isNil(this.shell)) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "Shell should be specified only when shell profile path is specified");
            }
            if (!_.isNil(this.shell) && SetupAutoCompleteCommand_1.supportedShells.indexOf(this.shell) === -1) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `${this.shell} is not supported. Only ${SetupAutoCompleteCommand_1.supportedShells.join(", ")} are supported`);
            }
            if (_.isNil(this.shell) && (!process.env.SHELL || !process.env.SHELL.match(SetupAutoCompleteCommand_1.supportedShells.join("|")))) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "Current shell cannot be detected, please specify it explicitly");
            }
            if (!_.isNil(this.shellProfilePath)) {
                mkdirp.sync(Path.dirname(this.shellProfilePath));
            }
            Process.on("exit", (code) => {
                if (code === 0) {
                    interaction_1.out.text("Please restart shell to apply changes");
                }
            });
            autocomplete_1.setupAutoCompleteForShell(this.shellProfilePath, this.shell);
            return commandline_1.success();
        });
    }
};
SetupAutoCompleteCommand.supportedShells = ["bash", "zsh", "fish"];
__decorate([
    commandline_1.help("Shell to generate autocompletion code for. Supported values - bash, zsh, fish. Default: shell specified in $SHELL"),
    commandline_1.shortName("s"),
    commandline_1.longName("shell"),
    commandline_1.hasArg
], SetupAutoCompleteCommand.prototype, "shell", void 0);
__decorate([
    commandline_1.help("Optional shell profile path. Default: $HOME/.bash_profile for bash, $HOME/.zshrc for zsh, $HOME/.config/fish/config.fish for fish"),
    commandline_1.name("shell-profile-path"),
    commandline_1.position(0)
], SetupAutoCompleteCommand.prototype, "shellProfilePath", void 0);
SetupAutoCompleteCommand = SetupAutoCompleteCommand_1 = __decorate([
    commandline_1.help("Setup tab completion for your shell")
], SetupAutoCompleteCommand);
exports.default = SetupAutoCompleteCommand;
