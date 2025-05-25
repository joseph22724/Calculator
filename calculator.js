function add (a, b) {
    return a + b;
};
function sub (a, b) {
    return a - b;
};
function mult (a, b) {
    return a * b;
};
function divide (a, b) {
    return a / b;
};

function operate(operator, num1, num2){
    switch (operator){
        case "+":
            return add(num1, num2);
        case "-":
            return sub(num1, num2);
        case "*":
            return mult(num1, num2);
        case "/":
            return divide(num1, num2);
    }
};


let num1 = null;
let num2 = null;
let operator = null;

