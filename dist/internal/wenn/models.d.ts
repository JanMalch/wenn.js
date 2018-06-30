import { ELSE } from "./symbols";
export declare type WhenFunction<T> = (value: T) => boolean;
export declare type When<T> = T | WhenFunction<T> | T[] | WhenFunction<T>[] | typeof ELSE;
export declare type ThenFunction<T, E> = (value?: T) => E;
export declare type Then<T, E> = ThenFunction<T, E> | E | undefined;
export declare abstract class ICaseThen<T, E> {
    abstract Then(then: Then<T, E>): ICaseThen<T, E>;
}
