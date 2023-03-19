let screenValue = "";
let operator = "";
let inputA = "";
let inputB = "";
let active = false;
let result = null;

const screen = document.querySelector("#display-screen");

const add = (inputA, inputB) => Number(inputA) + Number(inputB);
const subtract = (inputA, inputB) => Number(inputA) - Number(inputB);
const multiply = (inputA, inputB) => Number(inputA) * Number(inputB);
const divide = (inputA, inputB) => {
  if (inputB == 0) {
    screen.textContent = "Nice try!";
  } else {
    return Number(inputA) / Number(inputB);
  }
};

const setOperator = (op) => {
  if (!active) {
    return;
  }

  if (operator) {
    operate();
  }

  operator = op;
  inputA = screenValue;
  screen.textContent = screenValue;
  result = "";
};

const updateDisplay = (number) => {
  if (result !== null) {
    screenValue = "";
    result = null;
  }

  screen.innerText = screenValue;
  active = true;

  if (screenValue.length < 9) {
    if (screenValue === "0" || result === null) {
      screenValue += number;
      screen.textContent = screenValue;
    }
  }
};

const deleteDisplay = () => {
  screenValue = "";
  screen.textContent = "0";
  operator = "";
  inputA = "";
  inputB = "";
  result = null;
  active = false;
};

const backspace = () => {
  screenValue = screenValue.slice(0, -1);
  screen.textContent = screenValue;

  if (screenValue === "") {
    deleteDisplay();
  }
};

const inputDecimal = (dot) => {
  if (screenValue === inputA || screenValue === inputB) {
    screenValue = "0";
  }

  if (!screenValue.includes(dot)) {
    screenValue += dot;
  }

  screen.textContent = screenValue;
};

const operate = () => {
  inputB = screenValue;

  switch (operator) {
    case "":
      result = "0";
      break;
    case "+":
      result = add(inputA, inputB);
      break;
    case "-":
      result = subtract(inputA, inputB);
      break;
    case "*":
      result = multiply(inputA, inputB);
      break;
    case "/":
      if (inputA % inputB == 0) {
        result = parseInt(Number(inputA) / Number(inputB));
      } else {
        result = divide(inputA, inputB).toFixed(3).substring(0, 9);
      }
      break;
    default:
      result = "Error: Invalid operator";
  }

  screenValue = result.toString();
  screen.textContent = screenValue;
  inputA = "";
  inputB = "";
  operator = "";
};

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= 0 && key <= 9) {
    updateDisplay(key);
  } else if (key === ".") {
    inputDecimal(".");
  } else if (key === "Backspace") {
    backspace(); 
  } else if (key === "Delete"){
    deleteDisplay();
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    setOperator(key);
  } else if (key === "Enter" || key === "=") {
    operate();
  }
});
