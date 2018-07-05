import { Then, When } from "./models";
export declare class CaseThen<T, E> {
    readonly cases: When<T>[];
    readonly then: Then<T, E>;
    constructor(cases: When<T>[], then: Then<T, E>);
}
export declare class CaseBuilder<T, E> {
    readonly cases: When<T>[];
    constructor(cases: When<T>[]);
    Then(then: Then<T, E>): CaseThen<T, E>;
}
