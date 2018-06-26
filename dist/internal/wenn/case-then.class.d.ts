import { ICaseThen, Then, When } from "./models";
export declare class CaseThen<T, E> extends ICaseThen<T, E> {
    then: Then<T, E>;
    cases: When<T>[];
    constructor(..._cases: When<T>[]);
    Then(then: Then<T, E>): CaseThen<T, E>;
}
