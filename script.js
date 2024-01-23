//Button Variables - can simplify this
const calcDisplayField = document.querySelector("#calcDisplay"); 
const btnDecimal = document.querySelector('#btn-decimal');
const btnReset = document.querySelector('#btn-reset');
const btnAdd = document.querySelector('#btn-add');
const btnSubtract = document.querySelector('#btn-subtract');
const btnMultiply = document.querySelector('#btn-multiply');
const btnDivide = document.querySelector('#btn-divide');
const btnPercentage = document.querySelector('#btn-percentage');
const btnEqual = document.getElementById('btn-equal');
const btnDelete = document.querySelector('#btn-delete');
const btnSigns = document.querySelector('#btn-signs')
const buttons = []; for (i = 0; i <= 9; i++) {buttons[i] = document.querySelector('#btn'+i);};

// Variables
let variables = [], operator = '', runningTotal = 0; 
let stepBy = 0;
let lastVariables = [], lastOperator = '', lastTotal = 0, lastInput = '', lastCommand = '';
calcDisplayField.value = 0;

//Operator Functions
function operate(operator, a, b) {
    let value = 0;
    if (operator === '+') { return value = add(a, b)}
    else if (operator === '-') {return value = subtract(a, b)}
    else if (operator === '*') {return value = multiply(a, b)}
    else {return value = divide(a, b)};
};
function add(a, b) {return Number(a) + Number(b);};
function subtract(a, b) {return Number(a) - Number(b);};
function multiply(a, b) {return Number(a) * Number(b);};
function divide(a, b) {return Number(a) / Number(b);}; 
    //need to prevent divided by zero
function takeSnapshot() {lastTotal = runningTotal; lastVariables = variables; lastOperator = operator;};

//NUMBERIC BUTTONS - Event Listener (keystroke to be added)
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        if ((lastInput === '' || lastInput === '+' || lastInput === '-' || lastInput === '*' || lastInput === '/' || lastInput === '=' )) {
            calcDisplayField.value = [i];
        }
        else {
            if (calcDisplayField.value.length < 9) {
                calcDisplayField.value += [i]; 
            }
        }
        lastInput = 'number';
    })
}

//SIGN BUTTON - Event Listener
btnSigns.addEventListener('click', function() {
    if (calcDisplayField.value === '0') {calcDisplayField.value = '-';}
    else if (calcDisplayField.value === '-') {calcDisplayField.value = '0';}
    else if (calcDisplayField.value[0] !== '-' && calcDisplayField.value !== '0') {
        removeNegative = calcDisplayField.value.slice(0,0) + '-' +calcDisplayField.value;
        calcDisplayField.value = removeNegative;
    }
    else {calcDisplayField.value = calcDisplayField.value.slice(1);}
    // lastInput = 'sign';
    // Disabled the above, otherwise it will break the = function where it checks whether the last input was number
});

//DECIMAL BUTTON - Event Listener (keystroke to be added)
btnDecimal.addEventListener('click', function() {
    if ((lastInput === '' || lastInput === '+' || lastInput === '-' || lastInput === '*' || lastInput === '/' || lastInput === '=' )) {
        //add to 0, if it's the first thing user presses after the above operation
        calcDisplayField.value = '0.';
    }
    else if (calcDisplayField.value.search(/[.]/) === -1) {
        calcDisplayField.value += '.'; 
    }
    lastInput = '.';
});

//BACKSPACE BUTTON -  Event Listener (keystroke to be added))
btnDelete.addEventListener('click', function() {
    const lastDigitDeleted = calcDisplayField.value.slice(0, -1);
    calcDisplayField.value = lastDigitDeleted;
});

//RESET BUTTON -  Event Listener
btnReset.addEventListener('click', function() {
    runningTotal = 0; 
    lastTotal = 0;
    variables = [];
    lastVariables = [];
    operator = '';
    lastOperator = '';
    lastInput = '';
    lastCommand = '';
    stepBy = 0;
    calcDisplayField.value = 0;
});

//ADD BUTTON - Event Listener (keystroke to be added)
btnAdd.addEventListener('click', function(){
    console.log('ADD operation')
    if (variables.length === 0) {
        console.log('ADD scenario 1')
        variables.push(calcDisplayField.value);
        operator = '+';
    }
    else if (variables.length === 1) {
        console.log('ADD scenario 2 - var.length === 1')
        variables.push(calcDisplayField.value);
        //if the last operator isn't the same as + then it should sum up the values using prev operator
        //before setting + as the current operator
        if (lastOperator !== '+') {
            operator = lastOperator;
        }    
        else {
            operator = '+';
        }
        takeSnapshot();
        runningTotal += operate(operator, variables[0], variables[1]);
        operator = '+';
        calcDisplayField.value = runningTotal;
        }
    else if (variables.length === 2) {
            console.log('ADD scenario 3 - var.length === 2')
            variables[0] = runningTotal;
            variables[1] = calcDisplayField.value;
            operator = '+';
            takeSnapshot();
            runningTotal = operate(operator, variables[0], variables[1]);
            calcDisplayField.value = runningTotal;
        }
    //NEED CONDITION WHEN SWITCHING FROM DIFFERENT OPERATORS
    lastOperator = operator;
    lastCommand = operator;
    lastInput = operator;
    console.log('var: ' + variables+ ' | operator: ' +operator+ ' | lastCommand: ' +lastCommand+ ' | lastInput: ' +lastInput);
    console.log('last var: ' + lastVariables+ ' | last operator: ' +lastOperator);
});

//SUBTRACT BUTTON - Event Listener (keystroke to be added)
btnSubtract.addEventListener('click', function(){
    console.log('SUB operation')
    if (variables.length === 0) {
        console.log('SUB scenario 1')
        variables.push(calcDisplayField.value);
        operator = '-';
    }
    else if (variables.length === 1) {
        console.log('SUB scenario 2 - var.length === 1')
        variables.push(calcDisplayField.value);
        if (lastOperator !== '-') {
            operator = lastOperator;
        }    
        else {
            operator = '-';
        }
        takeSnapshot();
        runningTotal += operate(operator, variables[0], variables[1]);
        operator = '-';
        calcDisplayField.value = runningTotal;
        }
    else if (variables.length === 2) {
            console.log('SUB scenario 3 - var.length === 2')
            variables[0] = runningTotal;
            variables[1] = calcDisplayField.value;
            if (lastOperator !== '-') {
                operator = lastOperator;
            }    
            else {
                operator = '-';
            }
            takeSnapshot();
            runningTotal = operate(operator, variables[0], variables[1]);
            operator = '-';
            calcDisplayField.value = runningTotal;
        }
    //NEED CONDITION WHEN SWITCHING FROM DIFFERENT OPERATORS
    lastOperator = operator;
    lastCommand = operator;
    lastInput = operator;
    console.log('var: ' + variables+ ' | operator: ' +operator+ ' | lastCommand: ' +lastCommand+ ' | lastInput: ' +lastInput);
    console.log('last var: ' + lastVariables+ ' | last operator: ' +lastOperator);
});

//EQUAL BUTTON
btnEqual.addEventListener('click', function() {
    if (variables.length === 1) { 
        console.log('equal case 1')
        if (lastInput === 'number') {
            console.log('equal case 1A')
            variables.push(calcDisplayField.value); 
        }
        else { //this is so 2+= is 4.... this to make this work with chaining operation
            if (lastVariables.length === 0) { 
                console.log('equal case 1B-A')
                variables[1] = variables[0];
                //STEP BY IS WRONG
                stepBy = variables[1];
            }
            else {
                console.log('equal case 1B-B')
                variables[1] = 0; //come back for multiply and divide
                stepBy = variables[0];
            }
        }
        takeSnapshot();
        runningTotal = operate(operator, variables[0], variables[1]);
        //manipulate stepBy to decrement if the last operation was minus
        if (lastOperator === '-') {
            stepBy = variables[1] * -1;
        }
        else {
            stepBy = variables[1];
        }

        lastCommand = '=';
    }
    //chaining increment to work e.g. 2+2+= should equal to
    //pressing multiple '=' in a row should increment/decrement using last number and operator
    else if (lastCommand === '=' && lastOperator !== '') { 
        console.log('equal case 2')
        operator = lastOperator;        
        variables[0] = stepBy; //POTENTIAL ERROR WITH -
    
        if (lastOperator === '+') {
            console.log('equal case 2A+');
            variables[1] = 0;
            takeSnapshot();
            runningTotal += operate(operator, variables[0], variables[1]);
        }
        //if this doesn't work revert it back by using || operator against first IF statement
        else if (lastOperator === '-') {
            console.log('equal case 2B-');
            variables[1] *= -1;
            variables[1] = 0;
            takeSnapshot();
            runningTotal += operate(operator, variables[0], variables[1]);
        }
        
        else { //for * and /
            console.log('equal case 2C');
            variables[1] = 1;
            takeSnapshot();
            runningTotal += operate(operator, variables[0], variables[1]);
        }
    }
    else if (variables.length === 2) {
        console.log('Pressing = and the variable length is 2 ')
        variables[0] = runningTotal;
        variables[1] = calcDisplayField.value;
        takeSnapshot();
        runningTotal = operate(operator, variables[0], variables[1]); //ERROR negative sign is wrong
        if (lastOperator === '-') {
            stepBy = Number(lastVariables[1]) * -1;
        }
        else {
            stepBy = Number(lastVariables[1])
        }
        lastCommand = '=';
    }


    if (operator !== '') {
        calcDisplayField.value = runningTotal;
    }
    console.log('var: ' + variables+ ' | operator: ' +operator+ ' | lastCommand: ' +lastCommand+ ' | lastInput: ' +lastInput);
    console.log('last var: ' + lastVariables+ ' | last operator: ' +lastOperator);
    console.log('runningTotal: ' +runningTotal+ ' | lastTotal: ' +lastTotal + '| Step By: ' + stepBy);
    variables = [];
    operator = '';
    lastInput = '=';
    lastCommand = '=';
});


//TO DO
//1. subtract
//2. be able to switch operation ( - --> + / + --> -)
//2. multiply
//3. divide
//4. +/- switch increment/decrement direction
