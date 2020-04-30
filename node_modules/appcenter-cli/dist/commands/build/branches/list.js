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
const format_build_1 = require("./lib/format-build");
const commandline_1 = require("../../../util/commandline");
const apis_1 = require("../../../util/apis");
const interaction_1 = require("../../../util/interaction");
const util_1 = require("util");
const _ = require("lodash");
const debug = require("debug")("appcenter-cli:commands:build:branches:list");
let ShowBranchesListBuildStatusCommand = class ShowBranchesListBuildStatusCommand extends commandline_1.AppCommand {
    run(client, portalBaseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = this.app;
            debug(`Getting list of branches for app ${app.appName}`);
            let branchesStatusesRequestResponse;
            try {
                branchesStatusesRequestResponse = yield interaction_1.out.progress(`Getting statuses for branches of app ${app.appName}...`, apis_1.clientRequest((cb) => client.builds.listBranches(app.ownerName, app.appName, cb)));
            }
            catch (error) {
                debug(`Request failed - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to fetch branches list");
            }
            const branchBuildsHttpResponseCode = branchesStatusesRequestResponse.response.statusCode;
            if (branchBuildsHttpResponseCode >= 400) {
                switch (branchBuildsHttpResponseCode) {
                    case 400:
                        return commandline_1.failure(commandline_1.ErrorCodes.IllegalCommand, `app ${app.appName} is not configured for building`);
                    default:
                        debug(`Request failed - HTTP ${branchBuildsHttpResponseCode} ${branchesStatusesRequestResponse.response.statusMessage}`);
                        return commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to fetch branches list");
                }
            }
            const branchesWithBuilds = _(branchesStatusesRequestResponse.result)
                .filter((branch) => !_.isNil(branch.lastBuild))
                .sortBy((b) => b.lastBuild.sourceBranch)
                .value();
            if (branchesWithBuilds.length === 0) {
                interaction_1.out.text(`There are no configured branches for the app ${app.appName}`);
                return commandline_1.success();
            }
            const buildShas = branchesWithBuilds.map((branch) => branch.lastBuild.sourceVersion);
            debug("Getting commit info for the last builds of the branches");
            let commitInfoRequestResponse;
            try {
                commitInfoRequestResponse = yield interaction_1.out.progress("Getting commit info for the last builds of branches...", apis_1.clientRequest((cb) => client.commits.listByShaList(buildShas, app.ownerName, app.appName, cb)));
            }
            catch (error) {
                debug(`Request failed - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, "failed to get commit details");
            }
            const commits = commitInfoRequestResponse.result;
            const buildReportObjects = branchesWithBuilds.map((branch, index) => format_build_1.getBuildReportObject(branch.lastBuild, commits[index], app, portalBaseUrl));
            format_build_1.reportBuilds(buildReportObjects);
            return commandline_1.success();
        });
    }
};
ShowBranchesListBuildStatusCommand = __decorate([
    commandline_1.help("Show list of branches")
], ShowBranchesListBuildStatusCommand);
exports.default = ShowBranchesListBuildStatusCommand;
