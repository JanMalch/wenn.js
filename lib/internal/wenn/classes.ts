import {Then, When} from "./models";

export class CaseThen<T, E> {
    constructor(public readonly cases: When<T>[],
                public readonly then: Then<T, E>) {
    }
}

export class CaseBuilder<T, E>  {
    constructor(public readonly cases: When<T>[]) {
    }

    Then(then: Then<T, E>): CaseThen<T, E> {
        return new CaseThen<T, E>(this.cases, then);
    }
}