# wenn.js
A simple but powerful utility function, inspired by Kotlin's [`when`](https://kotlinlang.org/docs/reference/control-flow.html#when-expression).

## Installation

```sh
npm install wenn.js --save
```

## Basic Usage

 
```typescript  
const value = "Foo";  
const result = wenn(value,  
  Case("Foo").Then(0),  
  Case("Bar").Then(1)
);  
// result == 0
```  

```typescript  
const value = "Foo";  
wenn(value,  
  Case("Foo").Then(() => console.log("Value is 'Foo'")),  
  Case("Bar").Then(() => console.log("Value is 'Bar'"))
);  
```  

```typescript  
const value = "Test";  
const result = wenn(value,  
  Case("Foo").Then(0),  
  Case("Bar").Then(1),  
  Else(-1)
);  
// result == -1
``` 
> If an Else case would be required but not found, there will be an error. You can always add `Else(null)`.
```typescript  
const value = "Test";  
const result = wenn(value,  
  Case("Foo").Then(0),  
  Case("Bar").Then(1)
);  
// ERROR: No case matched, but also no ELSE case given. You can add Else(null) to your cases to prevent an error.
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

```JavaScript 
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

```JavaScript 
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

```JavaScript 
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

```JavaScript 
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

```JavaScript 
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

## Work in Progress

- [ ] write `wennChained` function, to make Cases chainable, to propagate new values
- [ ] improve error messages and typings (?) 
- [ ] gladly accept any recommendations and help

## License
MIT
