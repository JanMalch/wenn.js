// WHEN
import {ELSE} from "./symbols";

export type WhenFunction<T> = (value: T) => boolean;
export type When<T> = T | WhenFunction<T> | T[] | WhenFunction<T>[] | typeof ELSE;

// THEN
export type ThenFunction<T, E> = (value?: T) => E;
export type Then<T, E> =  ThenFunction<T, E> | E | undefined;

export abstract class ICaseThen<T, E> {
    abstract Then(then: Then<T, E>): ICaseThen<T, E>;
}
