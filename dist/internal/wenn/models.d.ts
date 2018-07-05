import { ELSE } from "./symbols";
/**
 * type alias for a function that requires a single argument and returns a boolean
 */
export declare type WhenFunction<T> = (value: T) => boolean;
/**
 * type alias for varargs of values or {@link WhenFunction}s
 */
export declare type When<T> = T | WhenFunction<T> | T[] | WhenFunction<T>[] | typeof ELSE;
/**
 * type alias for a function that accepts a single optional argument and returns a value
 */
export declare type ThenFunction<T, E> = (value?: T) => E;
/**
 * type alias for {@link ThenFunction} or value or undefined
 */
export declare type Then<T, E> = ThenFunction<T, E> | E | undefined;
/**
 * This interface represents a Case-Then-Pair.
 *
export interface ICaseThen<T, E> {
}

/**
 * This interface prepares a {@link ICaseThen Case-Then-Pair}
 *
export interface ICase<T, E> {

    Then(then: Then<T, E>): ICaseThen<T, E>;
}*/ 
