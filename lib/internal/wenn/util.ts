import {Then, When, WhenFunction} from "./models";
import {isFunction} from "../../util";

export function applyOrReturn<T, E>(input: T, funOrVal: Then<T, E>) {
    return isFunction(funOrVal) ? funOrVal(input) : funOrVal;
}

export function returnsTrueOrEquals<T>(value: T, Case: When<T>): boolean {
    const isCaseFun = isFunction(Case);
    return (isCaseFun && (Case as WhenFunction<any>)(value)) || (!isCaseFun && value === Case);
}