// @ts-nocheck

const normalKey = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    0: "zero",
    "+": "plus",
    "-": "minus",
    "*": "multiply",
    "/": "divide",
    "%": "percent",
    "^": "power",
    s: "sin_function",
    c: "cos_function",
    t: "tan_function",
    e: "e",
    ".": "dot",
    x: "one_divide_x",
    "(": "open_parenthesis",
    ")": "close_parenthesis",
    "!": "factorial",
    g: "log10",
    n: "ln",
    Delete: "delete",
    Enter: "result",
    Backspace: "delete",
    Escape: "clear",
};

document.addEventListener("keydown", (event) => {
    // for debug
    // console.log(event.key);

    if (event.key in normalKey) {
        document.getElementById(normalKey[event.key]).click();
    }
});
