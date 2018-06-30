import {ICaseThen, Then, When} from "./models";

export class CaseThen<T,E> extends ICaseThen<T, E>{

    public then: Then<T, E> = undefined;
    public cases: When<T>[];

    constructor(..._cases: When<T>[]) {
        super();
        this.cases = _cases;
    }

    Then(then: Then<T, E>): CaseThen<T, E> {
        this.then = then;
        return this;
    }

}