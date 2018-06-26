// WHEN
import {ELSE} from "./symbols";

export type WhenFunction<T> = (value: T) => boolean;
export type When<T> = T | WhenFunction<T> | T[] | WhenFunction<T>[] | typeof ELSE;

// THEN
export type Then<T, E> = (value?: T) => E | E;

export abstract class ICaseThen<T, E> {
    abstract Then(then: Then<T, E>): ICaseThen<T, E>;
}
