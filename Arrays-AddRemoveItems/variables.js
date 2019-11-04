//=========================================
// =========== CUSTOM USER INPUT ==========
//=========================================

// === input QUESTION here ===
let displayTitle = "Data Structure - Exercise 1: Add and Remove Items";

// === input QUESTION here ===
let displayQuestion =
  `
The function calls an array with 2 elements.

Use the 'push()' and 'unshift()' methods to increase the array element size from 2 to 6.

return arr.length should return 6.
`;

// === input CODE QUSTION here ===
let displayCode =
  `
  function mixedNumbers(arr) {
    // change code below this line
    

    // change code above this line  
    return arr.length;
  }
  
  x = mixedNumbers(["three", "four"]);
`;


// === input ANSWER here ===
let displayAnswer =
  ` 
  function mixedNumbers(arr) {

    arr.unshift("one", "two");
    arr.push("five", "six");

    return arr.length;
  }
  
  x = mixedNumbers(["three", "four"]);
`;

// === Desired Output (answer) here ===
// for strings use  "let Expecting = 'Hello World' ";

// let expectedOutput = "let Expecting = ['three','four']"
let expectedOutput = "let Expecting = 6";

//=========================================
//=========================================
//=========================================