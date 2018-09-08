import {CaseThen} from "./classes";
import {BREAK, ELSE} from "./symbols";
import {applyOrReturn, returnsTrueOrEquals} from "./util";
import {NoElseError} from "./errors";

/**
 * Pass in a value and an arbitrary amount of cases to be checked for that value.
 * Unless there is a {@link Break() Break() case} the new value will be propagating through the next cases, if they do match
 * @param {T} value the initial value
 * @param {CaseThen<T | typeof ELSE | typeof BREAK, E>} cases varargs of {@link CaseThen Case-Then-Pairs} to be checked
 * @returns {E} the resulting *Then* value of the first matching case chain, until {@link Break()} or end of arguments
 * @throws {NoElseError} A runtime error will be thrown, if no {@link #Else Else()} case was given, but is needed
 * @example
 * const value = 4;
 * const result = wennChain(value,
 *   Case(Util.isNegative).Then(0),
 *   Break(),
 *   Case(Util.isPositive).Then(x => x + 1),
 *   Case(Util.always).Then(x => x * 4),
 *   Break(),
 *   Case(Util.always).Then(x => x * 3) // this case is unreachable for the value 4, because there was a Break() before
 * );
 *
 * expect(result).to.equal(20); // (4+1) * 5 = 20
 */
export function wennChain<T, E>(value: T, ...cases: CaseThen<T | typeof ELSE | typeof BREAK, E>[]): E {
    let returnVal = value as any;
    let valChanged = false;

    let elseThen: any;
    let elseThenFound = false;

    for (let c  of cases) {
        const Case = c.cases;
        const Then = c.then;
        const SubCases = Array.isArray(Case) ? Case : [Case];

        for(let SubCase of SubCases) {
            if(SubCase === ELSE) {
                elseThen = Then;
                elseThenFound = true;
            }

            if(valChanged && SubCase === BREAK) {
                return returnVal;
            }

            if(returnsTrueOrEquals(returnVal, SubCase)) {
                returnVal = applyOrReturn(returnVal, Then);
                valChanged = true;
            }
        }
    }

    if(valChanged) {
        return returnVal;
    } else if (elseThenFound) {
        return applyOrReturn(value, elseThen);
    } else {
        throw new NoElseError();
    }
}