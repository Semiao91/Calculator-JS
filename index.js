const screen = document.querySelector("#display-screen");
let screenValue = "";
let operator = "";
let inputA = "";
let inputB = "";
let active = false; // prevents multiple operator presses
let result = null;

const add = (inputA, inputB) => {
    return(Number(inputA) + Number(inputB));
}

const subtract = (inputA, inputB) => {
    return(Number(inputA) - Number(inputB));
}

const multiply = (inputA, inputB) => {
    return(Number(inputA) * Number(inputB));
}

const divide = (inputA, inputB) => {
    if (inputB == 0) {
        screen.textContent = "Nice try!";
    }
    else {
        return (Number(inputA) / Number(inputB));
    }
}

const setOperator = (op) => {
    if (active === false) {
        return;
      }
      else {
    if (operator) {
        operate();
    }
    operator = op;
    inputA = screenValue;
    screen.textContent = screenValue;
    result = "";
}
}

function updateDisplay(number) {

    // Allows the user to start a new calculation when = is pressed
    if (result !== null) {
        screenValue = "";
        result = null;
      }

    screen.innerText = screenValue;
    active = true;

    if(screenValue.length < 9) {

        if (screenValue === "0") {
            screenValue = number;
            screen.textContent = screenValue;
            return
        }
        else if(result === null){
            screenValue += number;
            screen.textContent = screenValue;
        }
        else if(result === ""){
            screenValue = "";
            result = null;
            screenValue += number;
            screen.textContent = screenValue;
        }  
    }
}

function deleteDisplay(){
    screenValue = "";
    screen.textContent = "0";
    operator = null;
    inputA = null;
    inputB = null;
    result = null;
    active = false;
}

function backspace() {
      screenValue = screenValue.slice(0, -1);
    screen.textContent = screenValue;
    if (screenValue === "") {
        deleteDisplay();
    }
}

function inputDecimal(dot) {
    if(screenValue === inputA || screenValue === inputB) {
        screenValue = '0';
        screenValue += dot;
    } else if(!screenValue.includes(dot)) {
        screenValue += dot;
    } 
}

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
            if ( inputA % inputB == 0){
                result = parseInt(Number(inputA) / Number(inputB))
            }
            else{
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
}

document.addEventListener("keydown", (event) => {
    if (event.key >= 0 && event.key <= 9) {
      updateDisplay(event.key);
    } else if (event.key === ".") {
      inputDecimal(".");
    } else if (event.key === "Backspace") {
      backspace();
    } else if (event.key === "+") {
      setOperator("+");
    } else if (event.key === "-") {
      setOperator("-");
    } else if (event.key === "*") {
      setOperator("*");
    } else if (event.key === "/") {
      setOperator("/");
    } else if (event.key === "Enter" || event.key === "=") {
      operate();
    }
  });
  