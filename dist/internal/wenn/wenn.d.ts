import { ELSE } from "./symbols";
import { ICaseThen } from "./models";
export declare function wenn<T, E>(value: T, ...cases: ICaseThen<T | typeof ELSE, E>[]): any;
