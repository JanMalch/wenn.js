import {ICaseThen, Then, When} from "./models";
import {CaseThen} from "./case-then.class";
import {ELSE} from "./symbols";

export function Else<T, E>(then: Then<T, E>): ICaseThen<T, E> {
    return new CaseThen<T, E>(ELSE).Then(then);
}

export function Case<T, E>(...when: When<T>[]): ICaseThen<T, E> {
    return new CaseThen<T, E>(...when);
}