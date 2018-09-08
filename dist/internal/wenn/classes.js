"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CaseThen {
    constructor(cases, then) {
        this.cases = cases;
        this.then = then;
    }
}
exports.CaseThen = CaseThen;
class CaseBuilder {
    constructor(cases) {
        this.cases = cases;
    }
    Then(then) {
        return new CaseThen(this.cases, then);
    }
}
exports.CaseBuilder = CaseBuilder;
