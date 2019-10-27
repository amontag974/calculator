function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;

        case '-':
            return a - b;
        
        case '*':
            return a * b;

        case '/':
            return a / b;
    }
}

function solve() {
    let answer = operate(operator, num1, num2);
    display.innerText = answer;
    backspaceButton.removeEventListener('click',backspace)
    num1 = answer;
    initialized = false;
}

function performAdditionalOperation() {
    let answer = operate(operator, num1, num2);
    display.innerText = answer;
    num1 = answer;
    backspaceButton.removeEventListener('click',backspace)
    entry="";
}

function clearDisplay() {
    display.innerText = "0";
    operator = "";
    entry = "";
    initialized = false;
    num1 = 0;
    num2 = undefined;
}

function storeValue() {
    if (initialized) {
        num2 = parseFloat(entry);
        entry = "";
    } else {
        initialized = true;
        num1 = parseFloat(display.innerText);
        entry = "";
    }
 }

function enterValue(e) {
    entry += e.target.innerText;
    display.innerText = entry;
    setDecimalBtn();
}

function setDecimalBtn() {
    if (entry.includes(".")) {
        decimalButton.removeEventListener('click',enterValue);
    } else {
        decimalButton.addEventListener('click',enterValue);
    }
}

function chooseOperator(e) {
    backspaceButton.removeEventListener('click',backspace)
    if (operator) {
        operator = e.target.innerText;
        entry = "";
    } else {
        operator = e.target.innerText;
        initialized = true;
    }
}

function enableBackspace() {
    backspaceButton.addEventListener('click',backspace);
}

function backspace() {
    if (entry.length > 1 ) {
        entry = entry.slice(0,(entry.length-1));
        display.innerText = entry;
    } else {
        entry = "";
        display.innerText = 0;
        backspaceButton.removeEventListener('click',backspace)
    }
}

function changeSign() {
    if (parseFloat(display.innerText) > 0) {
        display.innerText = "-" + display.innerText;
    } else if (parseFloat(display.innerText) < 0) {
        display.innerText = display.innerText.slice(1);
    }
}

function numberClick(e) {
    enterValue(e);
    enableBackspace();
}

function operatorClick(e) {
    storeValue();
    chooseOperator(e);
}

function equalClick(e) {
    storeValue();
    solve();
}

const numberButton = document.querySelectorAll('.number');
const operatorButton = document.querySelectorAll('.operator')
const clearButton = document.querySelector('#clear');
const display = document.querySelector('#display');
const equalButton = document.querySelector('#equal');
const backspaceButton = document.querySelector('#backspace');
const decimalButton = document.querySelector('#decimal');
const signButton = document.querySelector('#sign');
let num1 = 0;
let num2;
let operator = "";
let entry = "";
let initialized = false;

numberButton.forEach(button => button.addEventListener('click',numberClick));
decimalButton.addEventListener('click',enterValue);
clearButton.addEventListener('click',clearDisplay);
operatorButton.forEach(button => button.addEventListener('click',operatorClick));
equalButton.addEventListener('click',equalClick);
signButton.addEventListener('click',changeSign);