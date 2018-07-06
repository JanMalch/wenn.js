"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const symbols_1 = require("./symbols");
/**
 * This function creates a new {@link CaseThen Case-Then-Pair} which acts as the default case, if no other case matched
 * @param {Then<typeof ELSE, E>} then the {@link Then} value or function to be returned or executed if no other case matched
 * @returns {CaseThen<typeof ELSE, E>} a new {@link CaseThen Case-Then-Pair} which acts as the default case, if no other case matched
 * @constructor
 */
function Else(then) {
    return new classes_1.CaseBuilder([symbols_1.ELSE]).Then(then);
}
exports.Else = Else;
/**
 * This function creates a new instance of a {@link CaseBuilder} which prepares for a {@link CaseThen Case-Then-Pair}
 * @param {When<T>} when varargs of {@link When conditions} that are checked to match the value, either by strict equal (===) or a function returning true
 * @returns {Case<T, E>} an instance of a {@link CaseBuilder} that prepares for a {@link CaseThen Case-Then-Pair}
 * @constructor
 */
function Case(...when) {
    return new classes_1.CaseBuilder(when);
}
exports.Case = Case;
