import { Then, When } from "./models";
import { CaseThen, CaseBuilder } from "./classes";
import { BREAK, ELSE } from "./symbols";
/**
 * This function creates a new {@link CaseThen Case-Then-Pair} which acts as the default case, if no other case matched
 * @param {Then<typeof ELSE, E>} then the {@link Then} value or function to be returned or executed if no other case matched
 * @returns {CaseThen<typeof ELSE, E>} a new {@link CaseThen Case-Then-Pair} which acts as the default case, if no other case matched
 * @constructor
 */
export declare function Else<E>(then: Then<typeof ELSE, E>): CaseThen<typeof ELSE, E>;
/**
 * This function creates a new instance of a {@link CaseBuilder} which prepares for a {@link CaseThen Case-Then-Pair}
 * @param {When<T>} when varargs of {@link When conditions} that are checked to match the value, either by strict equal (===) or a function returning true
 * @returns {Case<T, E>} an instance of a {@link CaseBuilder} that prepares for a {@link CaseThen Case-Then-Pair}
 * @constructor
 */
export declare function Case<T>(...when: When<T>[]): CaseBuilder<T>;
export declare function Break<E>(): CaseThen<typeof BREAK, E>;
