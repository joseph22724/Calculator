const buttons = document.querySelectorAll(".buttons");
const display = document.querySelector(".display");
const clear = document.querySelector(".clearButton");

let currNum = "";
let operator = "";
let prevNum = "";
let result = "";
let operationJustPerformed = false;


clear.addEventListener("click", () => {
    display.textContent = '0';
    currNum = "";
    prevNum = "";
    operator = "";
    result = "";
    operationJustPerformed = false;
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        console.log("(Beg)Values are now", `op: '${operator}'`, `prev: '${prevNum}'`, `curr: '${currNum}'`, `res: '${result}'`);
        let buttonValue = button.textContent.trim();

        const isNumber = !isNaN(parseFloat(buttonValue)) || buttonValue === '.';
        const isOperatorSymbol = ["+", "-", "*", "%"].includes(buttonValue);

        if (isNumber) {
            if (operationJustPerformed) {
                currNum = "";
                display.textContent = '';
                operationJustPerformed = false;
            }
            if (display.textContent === '0' && buttonValue !== '.') {
                display.textContent = '';
            }
            if (buttonValue === '.' && currNum.includes('.')) {
                return;
            }
            currNum += buttonValue;
            display.textContent = currNum;
        } else if (isOperatorSymbol) {
            if (prevNum !== "" && operator !== "" && currNum !== "") {
                console.log("(!=)Values are now (before parse for chain calc)", `op: '${operator}'`, `prev: '${prevNum}'`, `curr: '${currNum}'`);
                let num1 = parseFloat(prevNum);
                let num2 = parseFloat(currNum);
                result = operate(operator, num1, num2);
                console.log("(!=) Answer is ", result);

                if (String(result).startsWith("Error")) {
                    display.textContent = result;
                    prevNum = ""; currNum = ""; operator = "";
                } else {
                    prevNum = result.toString();
                    display.textContent = prevNum + buttonValue;
                }
                operator = buttonValue;
                currNum = "";
            } else if (currNum !== "") {
                prevNum = currNum;
                operator = buttonValue;
                currNum = "";
                display.textContent = prevNum + operator;
                console.log("(+)Values are now (currNum became prevNum)", `op: '${operator}'`, `prev: '${prevNum}'`, `curr: '${currNum}'`);
            } else if (prevNum !== "") {

                operator = buttonValue;
                display.textContent = prevNum + operator;
                console.log("(+)Values are now (only prevNum existed)", `op: '${operator}'`, `prev: '${prevNum}'`, `curr: '${currNum}'`);
            }
            operationJustPerformed = true;
        } else if (buttonValue === "=") {

            if (prevNum !== "" && currNum !== "" && operator !== "") {
                console.log("(!=)Values are now (before parse for equals)", `op: '${operator}'`, `prev: '${prevNum}'`, `curr: '${currNum}'`);
                let num1 = parseFloat(prevNum);
                let num2 = parseFloat(currNum);
                result = operate(operator, num1, num2);
                console.log("(=) Answer is ", result);

                if (String(result).startsWith("Error")) {
                    display.textContent = result;
                    prevNum = ""; currNum = ""; operator = "";
                } else {
                    display.textContent = result;
                    prevNum = result.toString();
                    currNum = "";
                    operator = "";
                }
            } else if (buttonValue === "=" && currNum === "" && prevNum === "") {

                display.textContent = "ERROR";
                currNum = ""; operator = ""; prevNum = ""; result = "";
            } else if (currNum !== "" && prevNum === "" && operator === "") {
                display.textContent = currNum;
                prevNum = currNum;
                result = currNum;
                currNum = "";
            }

            operationJustPerformed = true;
        }

        if (display.textContent === "NaN" || display.textContent === "Infinity" || display.textContent === "-Infinity") {
            display.textContent = "Error";
            currNum = ""; prevNum = ""; operator = ""; result = "";
            operationJustPerformed = true;
        }
        console.log("(End)Values are now", `op: '${operator}'`, `prev: '${prevNum}'`, `curr: '${currNum}'`, `res: '${result}'`);
    });
});

function add (a, b) {
    return a + b;
}
function sub (a, b) {
    return a - b;
}
function mult (a, b) {
    return a * b;
}
function divide (a, b) {
    if (b === 0) {
        return "Error";
    }
    if (a === 0 && b !== 0) {
        return 0;
    }
    return a / b;
}

function operate(selectedOperator, num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return "Error";
    }
    let calculation;
    switch (selectedOperator) {
        case "+":
            calculation = add(num1, num2);
            break;
        case "-":
            calculation = sub(num1, num2);
            break;
        case "*":
            calculation = mult(num1, num2);
            break;
        case "%":
            calculation = divide(num1, num2);
            break;
        default:
            return "Error";
    }
    
    if (typeof calculation === 'string' && calculation.startsWith("Error")) {
        return calculation;
    }
    if (typeof calculation === 'number' && !Number.isInteger(calculation)) {
        return parseFloat(calculation.toFixed(8));
    }
    return calculation;
}