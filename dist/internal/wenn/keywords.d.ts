import { ICaseThen, Then, When } from "./models";
export declare function Else<T, E>(then: Then<T, E>): ICaseThen<T, E>;
export declare function Case<T, E>(...when: When<T>[]): ICaseThen<T, E>;
