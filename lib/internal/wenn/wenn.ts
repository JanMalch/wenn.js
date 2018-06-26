
import {ELSE} from "./symbols";
import {ICaseThen} from "./models";
import {applyOrReturn, returnsTrueOrEquals} from "./util";
import {CaseThen} from "./case-then.class";

export function wenn<T, E>(value: T, ...cases: ICaseThen<T, E>[]) {
    let elseThen: any;
    let elseThenFound = false;

    for (let c  of cases as Array<CaseThen<T, E>>) {
        const Case = c.cases;
        const Then = c.then;
        const SubCases = Array.isArray(Case) ? Case : [Case];

        for(let SubCase of SubCases) {
            if(SubCase === ELSE) {
                elseThen = Then;
                elseThenFound = true;
            }

            if(returnsTrueOrEquals(value, SubCase)) {
                return applyOrReturn(value, Then);
            }
        }
    }


    if (elseThenFound) {
        return applyOrReturn(value, elseThen);
    } else {
        throw new Error("No case matched, but also no ELSE case given. You can add Else(null) to your cases to prevent an error.");
    }
}