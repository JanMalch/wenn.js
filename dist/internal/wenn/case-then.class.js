"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
class CaseThen extends models_1.ICaseThen {
    constructor(..._cases) {
        super();
        this.then = undefined;
        this.cases = _cases;
    }
    Then(then) {
        this.then = then;
        return this;
    }
}
exports.CaseThen = CaseThen;
