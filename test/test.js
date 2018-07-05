'use strict';
const expect = require('chai').expect;
const {wenn, Case, Else} = require("../dist/index.js");
const Util = require("../dist/util/index");

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
        }).to.throw(Error, "No case matched, but also no ELSE case given. You can add Else(null) to your cases to prevent an error.");

    });

    it("Else(null) should always work", () => {
        const value = "Test";
        const result = wenn(value,
            Case("Foo").Then(0),
            Case("Bar").Then(1),
            Else(null));

        expect(result).to.equal(null);

    });

    it("Else(null) should also work with functions in Then", () => {
        const value = "Test";
        wenn(value,
            Case("Foo").Then(() => void("Foo")),
            Case("Bar").Then(() => void("Bar")),
            Else(null)
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
        const value = new String("Test");
        const fun = Util.instanceOf(String);
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
        const fun =  Util.not(Util.isPositive);
        const result = fun(value);
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