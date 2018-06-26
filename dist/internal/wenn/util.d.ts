import { Then, When } from "./models";
export declare function applyOrReturn<T, E>(input: T, funOrVal: Then<T, E>): E | Then<T, E>;
export declare function returnsTrueOrEquals<T>(value: T, Case: When<T>): boolean;
