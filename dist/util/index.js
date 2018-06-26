"use strict";
// types
Object.defineProperty(exports, "__esModule", { value: true });
function instanceOf(instance) {
    return (value) => value instanceof instance;
}
exports.instanceOf = instanceOf;
function typeOf(type) {
    return (value) => typeof value === type;
}
exports.typeOf = typeOf;
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
exports.isNumeric = isNumeric;
// strings
function startsWith(prefix) {
    return (value) => !!value.startsWith && value.startsWith(prefix);
}
exports.startsWith = startsWith;
function includes(substring) {
    return (value) => !!value.includes && value.includes(substring);
}
exports.includes = includes;
function endsWith(suffix) {
    return (value) => !!value.endsWith && value.endsWith(suffix);
}
exports.endsWith = endsWith;
// number
function isEven(value) {
    return value % 2 == 0;
}
exports.isEven = isEven;
function isOdd(value) {
    return value % 2 == 1;
}
exports.isOdd = isOdd;
function isPositive(value) {
    return value > 0;
}
exports.isPositive = isPositive;
function isNegative(value) {
    return value < 0;
}
exports.isNegative = isNegative;
function inRange(min, max) {
    return (value) => value >= min && value <= max;
}
exports.inRange = inRange;
// collections
function inArray(array) {
    return (value) => array.indexOf(value) !== -1;
}
exports.inArray = inArray;
// other
function not(fn) {
    return (value) => !fn(value);
}
exports.not = not;
