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
const _ = require("lodash");
const format_build_1 = require("./lib/format-build");
const debug = require("debug")("appcenter-cli:commands:build:branches:show");
let ShowBranchBuildStatusCommand = class ShowBranchBuildStatusCommand extends commandline_1.AppCommand {
    run(client, portalBaseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            debug(`Getting builds for branch ${this.branchName}`);
            let branchBuildsRequestResponse;
            try {
                branchBuildsRequestResponse = yield interaction_1.out.progress(`Getting builds for branch ${this.branchName}...`, apis_1.clientRequest((cb) => client.builds.listByBranch(this.branchName, app.ownerName, app.appName, cb)));
            }
            catch (error) {
                if (error.statusCode === 400) {
                    return commandline_1.failure(commandline_1.ErrorCodes.IllegalCommand, `app ${app.appName} is not configured for building`);
                }
                else {
                    debug(`Request failed - ${util_1.inspect(error)}`);
                    return commandline_1.failure(commandline_1.ErrorCodes.Exception, "the Branch Builds request was rejected for an unknown reason");
                }
            }
            const builds = branchBuildsRequestResponse.result;
            if (builds.length === 0) {
                interaction_1.out.text(`There are no builds for the branch ${this.branchName}`);
                return commandline_1.success();
            }
            // Taking last build
            const lastBuild = _.maxBy(builds, (build) => Number(build.id));
            debug(`Getting commit info for commit ${lastBuild.sourceVersion}`);
            let commitInfoRequestResponse;
            try {
                commitInfoRequestResponse = yield interaction_1.out.progress(`Getting commit info for ${lastBuild.sourceVersion}...`, apis_1.clientRequest((cb) => client.commits.listByShaList([lastBuild.sourceVersion], app.ownerName, app.appName, cb)));
            }
            catch (error) {
                debug(`Request failed - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, "the Branch Builds request was rejected for an unknown reason");
            }
            const commitInfo = commitInfoRequestResponse.result[0];
            format_build_1.reportBuild(format_build_1.getBuildReportObject(lastBuild, commitInfo, app, portalBaseUrl));
            return commandline_1.success();
        });
    }
};
__decorate([
    commandline_1.help("Branch name for status check"),
    commandline_1.shortName("b"),
    commandline_1.longName("branch"),
    commandline_1.required,
    commandline_1.hasArg
], ShowBranchBuildStatusCommand.prototype, "branchName", void 0);
ShowBranchBuildStatusCommand = __decorate([
    commandline_1.help("Show branch build status")
], ShowBranchBuildStatusCommand);
exports.default = ShowBranchBuildStatusCommand;
