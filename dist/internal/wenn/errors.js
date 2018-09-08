"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoElseError extends Error {
    constructor() {
        super("No case matched, but also no ELSE case given. You can add Else(undefined) to your cases to prevent an error.");
    }
}
exports.NoElseError = NoElseError;
