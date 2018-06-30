"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const case_then_class_1 = require("./case-then.class");
const symbols_1 = require("./symbols");
function Else(then) {
    return new case_then_class_1.CaseThen(symbols_1.ELSE).Then(then);
}
exports.Else = Else;
function Case(...when) {
    return new case_then_class_1.CaseThen(...when);
}
exports.Case = Case;
