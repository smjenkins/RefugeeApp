"use strict";
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
const commandline_1 = require("../../../../util/commandline");
const espresso_1 = require("../../run/espresso");
const interaction_1 = require("../../../../util/interaction");
class RunEspressoWizardTestCommand extends commandline_1.AppCommand {
    constructor(args, interactiveArgs) {
        super(args);
        this._args = args;
        this._args.args.push(...interactiveArgs);
    }
    run(client, portalBaseUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            interaction_1.out.text("\nRunning command: appcenter test run espresso " + this._args.args.join(" ") + "\n");
            return new espresso_1.default(this._args).run(client, portalBaseUrl);
        });
    }
}
exports.default = RunEspressoWizardTestCommand;
