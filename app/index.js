const ticTacWrapper = document.querySelector(".ticTacWrapper");
const resultField = document.querySelector(".resultField");
const restartBtn = document.querySelector(".restartBtn");
const boxes = document.querySelectorAll(".box");
let whichTurn = true;
const winningCases = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
let oArray = [];
let xArray = [];

restartBtn.addEventListener("click", start);
function start() {
    resultField.textContent = null;
    boxes.forEach(
        e => e.textContent = ""
    )
    ticTacWrapper.removeEventListener("click", nextStep);
    ticTacWrapper.addEventListener("click", nextStep);
    oArray = Array(9).fill(0);
    xArray = Array(9).fill(0);    
    whichTurn = true;
}
start();


boxes.forEach(
    (e, index) => {
        e.id = index;
    }
)

function nextStep(e) {
    if (!e.target.textContent) {
        (whichTurn ? xArray : oArray)[e.target.id] = 1;
        enterTo(e.target);
        check(whichTurn ? xArray : oArray);
        whichTurn = !whichTurn;
    }
}
function check(array) {
    for (let e of winningCases) {
        if (array[e[0]] === 1 && array[e[1]] === 1 && array[e[2]] === 1) {
            resultField.textContent = `${whichTurn ? 'X' : 'O'} is win!`;
            ticTacWrapper.removeEventListener("click", nextStep);
            return;
        }
    }
}
function enterTo(div) {
    div.textContent = whichTurn ? "x" : "o";
}