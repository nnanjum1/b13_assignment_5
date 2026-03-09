1. What is the difference between var, let, and const?
ans:
var- It was used to declare variable mostly in previous days. variables can be redeclared and uodated. it is function scope.
```
var x = 5;
var x = 10; // works
```
let-used to declare variable. It can be updated but cannot be redeclared in the same block. it is block scope.
```
let x = 5;
x=6;   // works
let x = 10; // error
```
const-used to declare constant variable. It can not be updated to redeclared
```
const x = 5;
x=6;  // error
const x = 10; // error
```

2. What is the spread operator (...)?
ans: Spread operator used to copy or expand arrays,objects.
```
let arr = [1, 2];
let arr1 = [...arr, 3, 4]; //[1,2, 3, 4]

let obj = { x: 5 };
let obj1 = { ...obj, y: 10 }; // { x: 5, y: 10 }
```
3.What is the difference between map(), filter(), and forEach()?
ans:
map()-map() is used to perform any operation in with array elements. After operation it returns the result in a new array.
```
let numbers = [1, 2, 3];
let doubled = numbers.map(n => n * 2); // [2, 4, 6]
```
filter()-filter() is used to select items depending on condition  and returns a new array as result.
```
let numbers = [2, 4, 5];
let even = numbers.filter(n => n % 2 === 0); // [2,4]
```  
forEach()-goes through the array one by one and performs a task for each item.
```
let numbers = [1, 2, 3];
numbers.forEach(n => console.log(n * 2)); //  2, 4, 6
```
4. What is an arrow function?
ans:Arrow Function is a shortcut for writing functions
```
const add = (a, b) => a + b;
```

5. What are template literals?
ans: Template literals are a modern way to handle strings in JavaScript. we use backtick for this
```
let name = "Anjum";
let greeting = `Hello, ${name}!`; // Hello, Anjum!
```