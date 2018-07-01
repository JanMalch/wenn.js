import { ICaseThen, Then, When } from "./models";
import { ELSE } from "./symbols";
export declare function Else<E>(then: Then<typeof ELSE, E>): ICaseThen<typeof ELSE, E>;
export declare function Case<T, E>(...when: When<T>[]): ICaseThen<T, E>;
