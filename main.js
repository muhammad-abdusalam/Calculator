// ##Catch elements
// Calculator screen
const screenResult = document.getElementById("result");
const screenOperations = document.getElementById("operations");
// Calculator inputs
const numbers = document.querySelectorAll("#calc-inputs .number");
const operators = document.querySelectorAll("#calc-inputs .operator");
const arrayOfNumbers = Array.from(numbers);
const arrayOfOperators = Array.from(operators);
// Equal Sign & Clear All Button
const equalSign = document.getElementById("equal-sign");
const clearAll = document.getElementById("clear-screen");

// Regular Expressions
// Operators
const regExOp = /(\+|\-|\x|\/|\%)/gi;
// Numbers(negative, positive, float)
const regExNum = /(\(\-\)(\d+(\.\d+)?)?|\d+(\.\d+)?)/gi;

let firstNum = 0;
let lastNum = 0;
let allNumbers = [];
let result = 0;

let currOperator = "";
let preOperator = "";
let allOperators = [];

let calcInputs = [];
let operations = [];

let started = false;
// Operators Clicks Number
let clickNum = 0;

// If Input is Number
arrayOfNumbers.forEach(function (num) {
  num.onclick = function () {
    // Reset EveryThing After Equal Clicked
    if (+screenResult.innerHTML !== 0 && +screenOperations.innerHTML === 0) {
      resetAll();
    }

    // Add Numbers To Screen
    addOperations(num);

    // Add Numbers To Operations
    allNumbers = calcInputs.join("").match(regExNum);
    operations.push(allNumbers[allNumbers.length - 1]);

    // Set Last Number & make it negative or positive
    if (operations[operations.length - 1].startsWith("(-)")) {
      operations[operations.length - 1] = operations[
        operations.length - 1
      ].replace("(-)", "-");
      lastNum = +operations[operations.length - 1];
    } else {
      lastNum = +operations[operations.length - 1];
    }
  };
});
// If Input is Operator
arrayOfOperators.forEach(function (op) {
  op.onclick = function () {
    clickNum++;

    // Add Operators To Screen
    addOperations(op);

    // Add Operators To Operations
    allOperators = calcInputs.join("").match(regExOp);
    operations.push(allOperators[allOperators.length - 1]);

    // On first operation
    if (!started) {
      firstNum = +operations[operations.length - 2];
      // Program Started
      started = true;
    }

    // Set Current Operator
    currOperator = allOperators[allOperators.length - 1];

    // Do Calculations When Operators is Clicked For The Second Time
    if (clickNum > 1) {
      // Set Previous Operator When Last Number is (Negative or Positive)
      if (+operations[operations.length - 2] < 0) {
        preOperator = allOperators[allOperators.length - 3];
      } else {
        preOperator = allOperators[allOperators.length - 2];
      }

      // All Calculations
      if (preOperator === "+") {
        result = firstNum + lastNum;
      } else if (preOperator === "-") {
        result = firstNum - lastNum;
      } else if (preOperator === "x") {
        result = firstNum * lastNum;
      } else if (preOperator === "/") {
        result = firstNum / lastNum;
      } else if (preOperator === "%") {
        result = firstNum % lastNum;
      }
      // Update (First & Last) Number
      firstNum = result;
      lastNum = 0;

      // Show Result On Result Screen
      screenResult.innerHTML = result;
    }
  };
});

// Show Results When Equal Sign is Clicked
equalSign.onclick = function () {
  // Program Started
  started = true;

  // All Calculations
  if (currOperator === "+") {
    result = firstNum + lastNum;
  } else if (currOperator === "-") {
    result = firstNum - lastNum;
  } else if (currOperator === "x") {
    result = firstNum * lastNum;
  } else if (currOperator === "/") {
    result = firstNum / lastNum;
  } else if (currOperator === "%") {
    result = firstNum % lastNum;
  } else {
    // If There Is Only Numbers On Screen
    result = lastNum;
    clickNum++;
  }
  // Reset
  resetSome();
  // Update First Number
  firstNum = result;

  // Show Result On Result Screen
  screenResult.innerHTML = result;
};

// Clear All & Reset The Calculator
clearAll.onclick = function () {
  resetAll();
};

// ##Functions
// Add Inputs To Operations Screen
function addOperations(input) {
  calcInputs.push(input.dataset.inp);
  screenOperations.innerHTML = calcInputs.join("");
}

// Reset Functions
function resetSome() {
  calcInputs = [];
  operations = [];
  screenOperations.innerHTML = "0";

  lastNum = 0;

  currOperator = "";
  preOperator = "";

  allNumbers = [];
  allOperators = [];

  started = false;
}
function resetAll() {
  resetSome();
  screenResult.innerHTML = "0";
  firstNum = 0;
  result = 0;
  clickNum = 0;
}
