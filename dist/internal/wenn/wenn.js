"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const util_1 = require("./util");
/**
 * Pass in a value and an arbitrary amount of cases to be checked for that value.
 * A case will match if a primitive values strictly equals (===) the value or if a function returns true.
 * One case supports multiple conditions, of which one has to match.
 * Use an {@link #Else Else()} case to have a default fallback. If a default is needed but not implemented, a runtime error will be thrown.
 * It's the core function of the wenn.js library. It can be used as a statement or as an expression.
 * @param {T} value the value to be switched
 * @param {CaseThen<symbol | T, E>} cases varargs of {@link CaseThen Case-Then-Pairs} to be checked
 * @returns {E} the resulting Then value of the first matching case
 * @throws {Error} A runtime error will be thrown, if no {@link #Else Else()} case was given, but is needed
 */
function wenn(value, ...cases) {
    let elseThen;
    let elseThenFound = false;
    for (let c of cases) {
        const Case = c.cases;
        const Then = c.then;
        const SubCases = Array.isArray(Case) ? Case : [Case];
        for (let SubCase of SubCases) {
            if (SubCase === symbols_1.ELSE) {
                elseThen = Then;
                elseThenFound = true;
            }
            if (util_1.returnsTrueOrEquals(value, SubCase)) {
                return util_1.applyOrReturn(value, Then);
            }
        }
    }
    if (elseThenFound) {
        return util_1.applyOrReturn(value, elseThen);
    }
    else {
        throw new Error("No case matched, but also no ELSE case given. You can add Else(null) to your cases to prevent an error.");
    }
}
exports.wenn = wenn;
