const buttons = document.querySelectorAll(".buttons");
const display = document.querySelector(".display");
const clear = document.querySelector(".clearButton");

clear.addEventListener("click", () => {
    display.textContent = '';
    currNum = ""
    prevNum = ""
    operator = ""
});

    let currNum = "";
    let operator = "";
    let prevNum = "";
    let result = "";

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let buttonValue = button.textContent.trim();
            display.textContent += buttonValue;
            currNum += buttonValue;
            console.log("(Beg)Values are now", operator, prevNum, currNum);

            if(buttonValue ==  "+" || buttonValue ==  "-" || buttonValue ==  "*" || buttonValue ==  "%"){
                if (currNum !== "" && prevNum !== "" && operator !== "" && operator !== "") {
                
                    currNum = parseFloat(currNum, 10);
                    prevNum = parseFloat(prevNum, 10);
    
                    console.log("(!=)Values are now", operator, prevNum, currNum);
    
                    result = operate(operator, prevNum, currNum);
                    display.textContent = result + buttonValue;
                    currNum = ""
                    operator = ""
                    prevNum = result
                    console.log("(!=) Answer is ", result);
    
                }
                if (prevNum !== "" && operator == "") {
                    operator = buttonValue;
                } else {
                    operator = buttonValue;
                    prevNum = currNum.slice(0, -1);
                    currNum = "";
                    console.log("(+)Values are now", operator, prevNum, currNum); 
                }
            } 

            if (buttonValue == "="){
                if (prevNum == "" || currNum == "" ) {
                    display.textContent = "ERROR"
                    currNum = ""
                    operator = ""
                    prevNum = ""
                };
                currNum = parseFloat(currNum, 10);
                prevNum = parseFloat(prevNum, 10);
    
                console.log("(!=)Values are now", operator, prevNum, currNum);
    
                result = operate(operator, prevNum, currNum);
                display.textContent = result;
                currNum = ""
                operator = ""
                prevNum = result
                console.log("(=) Answer is ", result);
            }


        });
    });


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
        case "%":
            return divide(num1, num2);
    }
};




