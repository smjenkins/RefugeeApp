"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IoOptions = require("./io-options");
const out = require("./out");
class StreamingArrayOutput {
    constructor() {
        this.counter = 0;
    }
    start() {
        if (IoOptions.formatIsJson()) {
            console.log("[");
        }
    }
    text(converter, data) {
        if (this.counter) {
            if (IoOptions.formatIsJson()) {
                console.log(",");
            }
            else {
                console.log("");
            }
        }
        out.text(converter, data);
        this.counter++;
    }
    finish() {
        if (IoOptions.formatIsJson()) {
            console.log("]");
        }
    }
}
exports.default = StreamingArrayOutput;
