'use strict';

const {expect} = require('chai');
const {wenn, Case, Else, Break, wennChain, wennElvis, NoElseError} = require("../dist");
const {elvis, elvisCurried} = require("../dist/internal/wenn/wenn.elvis");
const Util = require("../dist/util");

describe("Basics", () => {
    it("should choose the correct case", () => {
        const value = true;

        const result = wenn(value,
            Case(true).Then("true"),
            Case(false).Then("false"));

        expect(result).to.equal("true");
    });

    it("should work without returns", () => {
        const value = 2;

        wenn(value,
            Case(1).Then(() => console.log("x == 1")),
            Case(2).Then(() => void 0),
            Else(() => console.log("x is neither 1 nor 2"))
        );
    });

    it("negation with not should work", () => {
        const value = "Foo";

        const result = wenn(value,
            Case(Util.not(Util.startsWith("B"))).Then("doesn't start with B"),
            Else("starts with B")
        );

        expect(result).to.equal("doesn't start with B");
    });
});

describe("Function Cases", () => {

    it("should work with wenn's util functions", () => {
        const value = 4;

        const result = wenn(value,
            Case(Util.isEven).Then("even"),
            Case(Util.isOdd).Then("odd"));

        expect(result).to.equal("even");
    });

    it("should support custom lambdas", () => {
        const value = "Apple";

        const result = wenn(value,
            Case(v => v.includes("pp")).Then(true),
            Else(false));

        expect(result).to.equal(true);

    });

});


describe("Multi Cases", () => {

    it("should be usable", () => {

        const value = "A";

        const result = wenn(value,
            Case("A", "B").Then(true),
            Else(false));

        expect(result).to.equal(true);
    });

    it("should support different case types in one case", () => {

        const value = "Apple";

        const result = wenn(value,
            Case("Banana", Util.startsWith("A")).Then(true),
            Else(false)
        );

        expect(result).to.equal(true);
    });

});

describe("ELSE", () => {

    it("should be used if needed", () => {
        const value = "C";

        const result = wenn(value,
            Case("A").Then(1),
            Case("B").Then(2),
            Else(-1));

        expect(result).to.equal(-1);
    });

    it("should throw Error if ELSE-case is needed", () => {

        expect(() => {
            wenn("C",
                Case("A").Then(1),
                Case("B").Then(2))
        }).to.throw(NoElseError);

    });

    it("Else(undefined) should always work", () => {
        const value = "Test";
        const result = wenn(value,
            Case("Foo").Then(0),
            Case("Bar").Then(1),
            Else(undefined));

        expect(result).to.equal(undefined);

    });

    it("Else(undefined) should also work with functions in Then", () => {
        const value = "Test";
        wenn(value,
            Case("Foo").Then(() => void("Foo")),
            Case("Bar").Then(() => void("Bar")),
            Else(undefined)
        );
    });

});

describe("wenn's utils for cases", () => {

    it("should find value in array", () => {
        const value = 4;
        const testArray = [1, 2, 3, 4, 5, 6];

        const result = wenn(value,
            Case(Util.inArray(testArray)).Then("in array"),
            Else("not in array")
        );

        expect(result).to.equal("in array");
    });

});

describe("Kotlin and README test cases", () => {

    it("Negate, range, in array", () => {

        const x = 25;
        const validNumbers = [30, 40];

        const result = wenn(x,
            Case(Util.inRange(1, 10)).Then("x is in the range"),
            Case(Util.inArray(validNumbers)).Then("x is valid"),
            Case(Util.not(Util.inRange(10, 20))).Then("x is outside the range"),
            Else("none of the above")
        );

        expect(result).to.equal("x is outside the range");

    });

    it("Functions of objects as cases", () => {

        const x = {
            isOdd: () => false,
            isEven: () => true
        };

        const result = wenn(true,
            Case(x.isOdd()).Then("x is odd"),
            Case(x.isEven()).Then("x is even"),
            Else("x is funny")
        );

        expect(result).to.equal("x is even");
    });
});

describe("wenn's case util functions", () => {

    it("should use instanceOf properly", () => {
        const value = new Map();
        const fun = Util.instanceOf(Map);
        const result = fun(value);

        expect(result).to.equal(true);
    });

    it("should use typeOf properly", () => {
        const value = 4;
        const fun = Util.typeOf("number");
        const result = fun(value);

        expect(result).to.equal(true);
    });

    it("should use isFunction properly", () => {
        const value = () => undefined;
        const result = Util.isFunction(value);
        expect(result).to.equal(true);
    });

    it("should use isNumeric properly", () => {
        const value = 4;
        const result = Util.isNumeric(value);
        expect(result).to.equal(true);
    });

    it("should use startsWith properly", () => {
        const value = "FooBar";
        const fun = Util.startsWith("Foo");
        const result = fun(value);
        expect(result).to.equal(true);
    });

    it("should use includes properly", () => {
        const value = "FooBar";
        const fun = Util.includes("ooB");
        const result = fun(value);
        expect(result).to.equal(true);
    });

    it("should use endsWith properly", () => {
        const value = "FooBar";
        const fun = Util.endsWith("Bar");
        const result = fun(value);
        expect(result).to.equal(true);
    });

    it("should use isEven properly", () => {
        const value = 4;
        const result = Util.isEven(value);
        expect(result).to.equal(true);
    });

    it("should use isOdd properly", () => {
        const value = 5;
        const result = Util.isOdd(value);
        expect(result).to.equal(true);
    });

    it("should use isPositive properly", () => {
        const value = 4;
        const result = Util.isPositive(value);
        expect(result).to.equal(true);
    });

    it("should use isNegative properly", () => {
        const value = -4;
        const result = Util.isNegative(value);
        expect(result).to.equal(true);
    });

    it("should interpret 0 as not positive", () => {
        const value = 0;
        const result = Util.isNegative(value);
        expect(result).to.equal(false);
    });

    it("should interpret 0 as not negative", () => {
        const value = 0;
        const result = Util.isPositive(value);
        expect(result).to.equal(false);
    });

    it("should use inRange properly", () => {
        const value = 4;
        const fun = Util.inRange(0, 10);
        const result = fun(value);
        expect(result).to.equal(true);
    });

    it("should use inArray properly", () => {
        const value = "Test";
        const fun = Util.inArray(["Foo", "Test", "Bar"]);
        const result = fun(value);
        expect(result).to.equal(true);
    });

    it("should use not properly", () => {
        const value = -4;
        const fun = Util.not(Util.isPositive);
        const result = fun(value);
        expect(result).to.equal(true);
    });

    it("should use always properly", () => {
        const value = -4;
        const result = Util.always(value);
        expect(result).to.equal(true);
    });


    it("should use isUndefined properly", () => {
        const value = undefined;
        const result = Util.isUndefined(value);
        expect(result).to.equal(true);
    });


    it("should use isntUndefined properly", () => {
        const value = "undefined";
        const result = Util.isntUndefined(value);
        expect(result).to.equal(true);
    });
});

describe("interal classes", () => {

    it("Case should not return null", () => {
        const result = Case(0);
        expect(result).to.not.be.null;
    });

    it("Case should not return null", () => {
        const result = Case(0).Then(0);
        expect(result).to.not.be.null;
    })
});

describe("wenn chain", () => {

    it("Basic chaining should work", () => {
        const value = 4;

        const result = wennChain(value,
            Case(Util.isPositive).Then(x => x + 1),
            Case(x => x > 4).Then(x => x * 4),
            Case(Util.always).Then(x => x * 3)
        );

        expect(result).to.equal(60);
    });

    it("chaining with breaks should work", () => {
        const value = 4;

        const result = wennChain(value,
            Case(Util.isNegative).Then(0),
            Break(),
            Case(Util.isPositive).Then(x => x + 1),
            Case(Util.always).Then(x => x * 4),
            Break(),
            Case(Util.always).Then(x => x * 3)
        );

        expect(result).to.equal(20);
    });

});

describe("wenn elvis", () => {

    it("Elvis should work", () => {
        const value = {
            data: {
                persons: [
                    {
                        name: {
                            firstName: "a",
                            lastName: "A"
                        },
                        age: 18
                    },
                    {
                        name: {
                            firstName: "b",
                            lastName: "B"
                        },
                        age: 21
                    },
                    {
                        name: {
                            firstName: "c",
                            lastName: "C"
                        },
                        age: 46
                    }
                ]
            }
        };

        const result = wennElvis(value,
            "data.persons",
            arr => arr.find(v => v.age > 18),
            "name.firstName"
        );

        expect(result).to.equal("b");
    });

    it("Elvis should safely return undefined", () => {
        const value = {
            data: {
                persons: [
                    {
                        name: {
                            firstName: "a",
                            lastName: "A"
                        },
                        age: 18
                    },
                    {
                        name: {
                            firstName: "b",
                            lastName: "B"
                        },
                        age: 21
                    },
                    {
                        name: {
                            firstName: "c",
                            lastName: "C"
                        },
                        age: 46
                    }
                ]
            }
        };

        const result = wennElvis(value,
            "data.persons",
            arr => arr.find(v => v.age > 100),
            "name.firstName"
        );

        expect(result).to.equal(undefined);
    });

    it("Elvis should safely return undefined in property access", () => {
        const value = {
            data: {
                persons: [
                    {
                        name: {
                            firstName: "a",
                            lastName: "A"
                        },
                        age: 18
                    },
                    {
                        name: {
                            firstName: "b",
                            lastName: "B"
                        },
                        age: 21
                    },
                    {
                        name: {
                            firstName: "c",
                            lastName: "C"
                        },
                        age: 46
                    }
                ]
            }
        };

        const result = wennElvis(value,
            "data.person",
            arr => arr.find(v => v.age > 100),
            "name.firstName"
        );

        expect(result).to.equal(undefined);
    });

    it("Elvis utility function 'elvis' should work for defined values", () => {
        const value = { a: { b: 1 }};
        const result = elvis(value, "a.b");

        expect(result).to.equal(1);
    });

    it("Elvis utility function 'elvis' should work for undefined values", () => {
        const value = { a: { b: 1 }};
        const result = elvis(value, "a.c");

        expect(result).to.equal(undefined);
    });

    it("Elvis utility function 'elvisCurried' should work", () => {
        const value = { a: { b: 1 }};
        const fn = elvisCurried("a.b");
        const result = fn(value);

        expect(result).to.equal(1);
    });
});