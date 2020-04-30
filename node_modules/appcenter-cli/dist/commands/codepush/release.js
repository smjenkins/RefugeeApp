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
const codepush_release_command_base_1 = require("./lib/codepush-release-command-base");
let CodePushReleaseCommand = class CodePushReleaseCommand extends codepush_release_command_base_1.default {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateContentsPath = this.specifiedUpdateContentsPath;
            this.targetBinaryVersion = this.specifiedTargetBinaryVersion;
            return yield this.release(client);
        });
    }
};
__decorate([
    commandline_1.help("Path to update contents folder"),
    commandline_1.shortName("c"),
    commandline_1.longName("update-contents-path"),
    commandline_1.required,
    commandline_1.hasArg
], CodePushReleaseCommand.prototype, "specifiedUpdateContentsPath", void 0);
__decorate([
    commandline_1.help("Semver expression that specifies the binary app version(s) this release is targeting (e.g. 1.1.0, ~1.2.3)"),
    commandline_1.shortName("t"),
    commandline_1.longName("target-binary-version"),
    commandline_1.required,
    commandline_1.hasArg
], CodePushReleaseCommand.prototype, "specifiedTargetBinaryVersion", void 0);
CodePushReleaseCommand = __decorate([
    commandline_1.help("Release an update to an app deployment")
], CodePushReleaseCommand);
exports.default = CodePushReleaseCommand;
