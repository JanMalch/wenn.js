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
