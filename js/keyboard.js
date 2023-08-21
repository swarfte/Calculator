const normalKey = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    0: "0",
    "+": "+",
    "-": "-",
    "*": "x",
    "/": "/",
    "%": "%",
    "^": "^",
    s: "sin(",
    c: "cos(",
    t: "tan(",
    e: "E",
    ".": ".",
    x: "1/(",
    "(": "(",
    ")": ")",
    "!": "!",
    g: "lg(",
    n: "ln(",
};

const specialKey = {
    Delete: deleteLastCharacter,
    Enter: getResult,
    Backspace: deleteLastCharacter,
    Escape: clearAll,
};
document.addEventListener("keydown", (event) => {
    // for debug
    // console.log(event.key);

    if (event.key in normalKey) {
        addOperator(normalKey[event.key]);
    } else if (event.key in specialKey) {
        specialKey[event.key]();
    }
});
