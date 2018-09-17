[![npm version](https://badge.fury.io/js/wenn.svg)](https://badge.fury.io/js/wenn) [![Build Status](https://travis-ci.org/JanMalch/wenn.js.svg?branch=master)](https://travis-ci.org/JanMalch/wenn.js) [![Coverage Status](https://coveralls.io/repos/github/JanMalch/wenn.js/badge.svg?branch=master)](https://coveralls.io/github/JanMalch/wenn.js?branch=master)

# wenn.js
A simple but powerful utility function, inspired by Kotlin's [`when`](https://kotlinlang.org/docs/reference/control-flow.html#when-expression).

## Installation

```sh
npm install wenn.js --save
```

## Basic Usage

```javascript  
const value = "Foo";  

const result = wenn(value,  
  Case("Foo").Then(0),  
  Case("Bar").Then(1)
);  

// result == 0
```  

```javascript  
const value = "Foo";  

wenn(value,  
  Case("Foo").Then(() => console.log("Value is 'Foo'")),  
  Case("Bar").Then(() => console.log("Value is 'Bar'"))
);  
```  

```javascript  
const value = "Test";  

const result = wenn(value,  
  Case("Foo").Then(0),  
  Case("Bar").Then(1),  
  Else(-1)
);  

// result == -1
``` 

> If an Else case would be required but not found, there will be an error. You can always add `Else(undefined)`.

```javascript  
const value = "Test";  

const result = wenn(value,  
  Case("Foo").Then(0),  
  Case("Bar").Then(1)
);  

// ERROR: No case matched, but also no ELSE case given. You can add Else(undefined) to your cases to prevent an error.
``` 

### Usage in TypeScript

Infer the types to prevent errors while compiling.

```typescript
const value: string = "Test";

const result: string = wenn(value,
  Case("Foo").Then("A"),
  Case("Bar").Then("B"),
  Else("?"));
```

### `wennChain` usage

`wennChain` allows you to propagate a value through all cases, until it doesn't match anymore or there's a `Break()`.

```javascript
const value = 4;

const result = wennChain(value,
    Case(isNegative).Then(0),
    Break(),
    Case(isPositive).Then(x => x + 1),
    Case(always).Then(x => x * 4),
    Break(),
    Case(always).Then(x => x * 3)
);

// result === 20
```

### `wennElvis` usage

`wennElvis` builds on top of `wennChain`. It's basically chained `isntUndefined` cases, with your given thens.
It allows a string with dot notation or even function calls, to access nested properties.
If a property wasn't found or a function call returns undefined, the function will safely return undefined.

```javascript
const value = {
    data: {
        persons: [
            {
                name: "A",
                age: 18
            },
            {
                name: "B",
                age: 21
            },
            {
                name: "C",
                age: 46
            }
        ]
    }
};

const result = wennElvis(value,
    "data.persons",
    arr => arr.find(v => v.age > 100),
    "name"
);

// result === undefined, and no error
```


You can look at some examples in the [test cases](https://github.com/JanMalch/wenn.js/blob/master/test/test.js).

## Comparison with Kotlin's `when`

### Simple number switch `else` case

Kotlin's `when`

```Kotlin
when (x) {  
	1 -> print("x == 1")  
	2 -> print("x == 2") 
	else -> {  // Note the block  
		print("x is neither 1 nor 2")  
	}  
}
``` 

wenn.js

```javascript 
wenn(x,  
  Case(1).Then(() => console.log("x == 1")),  
  Case(2).Then(() => console.log("x == 2")),  
  Else(() => console.log("x is neither 1 nor 2"))  
);
``` 

___

### Multi cases

Kotlin's `when`

```Kotlin
when (x) {
    0, 1 -> print("x == 0 or x == 1")
    else -> print("otherwise")
}
``` 

wenn.js

```javascript 
wenn(x,  
  Case(0, 1).Then(() => console.log("x == 0 or x == 1")),  
  Else(() => console.log("otherwise"))  
);
``` 

___

### Arbitrary expressions

Kotlin's `when`

```Kotlin
when (x) {
    parseInt(s) -> print("s encodes x")
    else -> print("s does not encode x")
}
``` 

wenn.js

```javascript 
wenn(x,  
  Case(isNumeric(s)).Then(() => console.log("s encodes x")),  
  Else(() => console.log("s does not encode x"))  
);
``` 

___

### Negate, range, in array

Kotlin's `when`

```Kotlin
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}
``` 

wenn.js

```javascript 
wenn(x,  
  Case(inRange(1, 10)).Then(() => console.log("x is in the range")),
  Case(inArray(validNumbers)).Then(() => console.log("x is valid")),
  Case(not(inRange(10, 20))).Then(() => console.log("x is outside the range")),  
  Else(() => console.log("none of the above"))  
);
``` 

___

### Functions of objects as cases

Kotlin's `when`

```Kotlin
when {
    x.isOdd() -> print("x is odd")
    x.isEven() -> print("x is even")
    else -> print("x is funny")
}
``` 

wenn.js

```javascript 
wenn(true,
    Case(x.isOdd()).Then("x is odd"),
    Case(x.isEven()).Then("x is even"),
    Else("x is funny")
);
``` 

## Test
```sh
npm run test
```

## Special Thanks

Special thanks to **[@MakroCow](https://github.com/MakroCow)** for helping out on the syntax and beta testing.

## License
MIT
