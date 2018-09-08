"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wenn_chain_1 = require("./wenn.chain");
const util_1 = require("../../util");
const keywords_1 = require("./keywords");
/**
 * wennElvis ensures error free access to properties in a chain, even if any one of them is undefined.
 * You may access them via dot notation in string or function calls. This includes functions like find for arrays etc.
 * If any property in the chain wasn't found or is undefined, the whole function will safely return undefined.
 * It builds on top of {@link wennChain}.
 * @param {T} value the value, which properties should be accessed
 * @param {ElvisThen} thens varargs of {@link ElvisThen Thens} to be checked
 * @returns {E} the accessed value or undefined
 * @see wennChain
 */
function wennElvis(value, ...thens) {
    return wenn_chain_1.wennChain(value, ...thens.map(t => keywords_1.Case(util_1.isntUndefined)
        .Then(typeof t === "string" ?
        elvisCurried(t) : t)));
}
exports.wennElvis = wennElvis;
/**
 * internal function to safely access properties via dot notation
 * @param {any} object the input object
 * @param {string} path the path to the property with dot notation
 */
function elvis(object, path) {
    // https://gist.github.com/cdmckay/6ac36defdc01d39080fa
    return path ? path.split(".").reduce((value, key) => value && value[key], object) : object;
}
exports.elvis = elvis;
/**
 * internal function to provide a curried version for the {@link #elvis} function
 * @param {string} path the path to the property with dot notation
 */
function elvisCurried(path) {
    return object => elvis(object, path);
}
exports.elvisCurried = elvisCurried;
