// @ts-nocheck

// the input row and output row
let calculatorInput = document.getElementById("calculator_input");
let calculatorOutput = document.getElementById("calculator_output");

const floatingPointPrecision = 10 * 9;

function addNumber(number) {
    addOperator(number);
}

function addOperator(operator) {
    calculatorInput.value += operator;
    calculate();
}

function clearAll() {
    calculatorInput.value = "";
    calculatorOutput.value = "";
}

function deleteLastCharacter() {
    value = calculatorInput.value;
    value = String(value);
    calculatorInput.value = value.slice(0, -1);
}

function solveFloatingPoint(number) {
    number =
        Math.round(number * floatingPointPrecision) / floatingPointPrecision;
    return number;
}

function RadianToAngle(value) {
    return (value * Math.PI) / 180;
}

function sinForAngle(value) {
    return solveFloatingPoint(Math.sin(RadianToAngle(value)));
}

function cosForAngle(value) {
    return solveFloatingPoint(Math.cos(RadianToAngle(value)));
}

function tanForAngle(value) {
    return solveFloatingPoint(Math.tan(RadianToAngle(value)));
}

function calculateTrigonometric(expression) {
    expression = expression.replace(/sin\(/g, "sinForAngle(");
    expression = expression.replace(/cos\(/g, "cosForAngle(");
    expression = expression.replace(/tan\(/g, "tanForAngle(");
    return expression;
}

function calculateExponential(expression) {
    expression = expression.replace(/\^/g, "**");
    return expression;
}

function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
}

function calculateLogarithm(expression) {
    expression = expression.replace(/lg\(/g, "getBaseLog(10,");
    expression = expression.replace(/ln\(/g, "getBaseLog(Math.E,");
    return expression;
}

function calculateMultiplication(expression) {
    expression = expression.replace(/x/g, "*");
    return expression;
}

function calculateNaturalNumber(expression) {
    expression = expression.replace(/E/g, Math.E);
    return expression;
}

function factorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    }

    let result = 1;
    for (let i = num; i >= 1; i--) {
        result *= i;
    }

    return result;
}

function findNumbersWithExclamation(str) {
    let numbers = str.match(/\d+!/g);
    if (numbers) {
        return numbers;
    } else {
        return [];
    }
}

function transferFactorialSymbol(numberList) {
    let result = [];
    for (const originalNumber of numberList) {
        const num = originalNumber.split("!");
        result.push("factorial(" + num[0] + ")");
    }
    return result;
}

function calculateFactorial(expression) {
    let factorialNumbers = findNumbersWithExclamation(expression);
    let transferFactorialNumbers = transferFactorialSymbol(factorialNumbers);
    if (factorialNumbers.length !== 0) {
        for (let index = 0; index < factorialNumbers.length; index++) {
            expression = expression.replace(
                factorialNumbers[index],
                transferFactorialNumbers[index]
            );
        }
    }
    return expression;
}

function getResult() {
    calculate();
    calculatorInput.value = "";
}

function calculate() {
    let expression = calculatorInput.value;
    const originalOutput = calculatorOutput.value;

    // order is important
    try {
        expression = calculateNaturalNumber(expression);
        expression = calculateTrigonometric(expression);
        expression = calculateLogarithm(expression);
        expression = calculateExponential(expression);
        expression = calculateMultiplication(expression);
        expression = calculateFactorial(expression);

        // for debug
        //console.log(expression);

        let result = eval(expression);
        result = solveFloatingPoint(result);
        calculatorOutput.value = result;
    } catch {
        calculatorOutput.value = originalOutput;
    }
}
