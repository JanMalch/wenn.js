"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbols_1 = require("./symbols");
const util_1 = require("./util");
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
