import {ICaseThen, Then, When} from "./models";
import {ELSE} from "./symbols";
import {CaseThen} from "./case-then.class";


export function Else<E>(then: Then<typeof ELSE, E>): ICaseThen<typeof ELSE, E> {
    return new CaseThen<typeof ELSE, E>(ELSE).Then(then);
}

export function Case<T, E>(...when: When<T>[]): ICaseThen<T, E> {
    return new CaseThen(...when);
}