"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../util");
function applyOrReturn(input, funOrVal) {
    return util_1.isFunction(funOrVal) ? funOrVal(input) : funOrVal;
}
exports.applyOrReturn = applyOrReturn;
function returnsTrueOrEquals(value, Case) {
    const isCaseFun = util_1.isFunction(Case);
    return (isCaseFun && Case(value)) || (!isCaseFun && value === Case);
}
exports.returnsTrueOrEquals = returnsTrueOrEquals;
