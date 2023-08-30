var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var resultField = document.querySelector(".result-field");
var restartBtn = document.querySelector(".restart-btn");
var boxes = document.querySelectorAll(".box");
var whichTurn = true;
var userText = "";
var gameArray = [];
var winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
var currentWinningCases = [];
function clickOnBox(e) {
    var target = e.target;
    target.textContent = userText;
    target.removeEventListener("click", onClick);
}
function pushArray(e) {
    var targetId = +e.target.id;
    gameArray[targetId] = userText;
}
function checking() {
    if (currentWinningCases.length > 1) {
        currentWinningCases.forEach(function (el) {
            if (el.every(function (i) { return gameArray[i] === userText; })) {
                removeOnclick();
                return (resultField.textContent = "".concat(userText, " is winning!"));
            }
            var isRawIncludesX = el.some(function (e) { return gameArray[e] === "X"; });
            var isRawIncludesO = el.some(function (e) { return gameArray[e] === "O"; });
            isRawIncludesX &&
                isRawIncludesO &&
                (currentWinningCases = currentWinningCases.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(el); }));
        });
        if (currentWinningCases.length === 1) {
            var lastClearRawText = gameArray[currentWinningCases[0][0]] ||
                gameArray[currentWinningCases[0][1]];
            lastClearRawText === userText &&
                (resultField.textContent = "it's draw") &&
                removeOnclick();
        }
    }
    else {
        resultField.textContent = "it's draw";
    }
}
function onClick(e) {
    userText = whichTurn ? "X" : "O";
    whichTurn = !whichTurn;
    clickOnBox(e);
    pushArray(e);
    checking();
}
function startGame() {
    currentWinningCases = __spreadArray([], winningCases, true);
    gameArray = __spreadArray([], Array(9).fill(""), true);
    whichTurn = true;
    resultField.textContent = "";
    boxes.forEach(function (e, index) {
        e.addEventListener("click", onClick);
        e.id = index.toString();
        e.textContent = "";
    });
}
startGame();
restartBtn.addEventListener("click", startGame);
function removeOnclick() {
    // remove onClick from EMPTY boxes
    gameArray.forEach(function (e, id) { return !e && boxes[id].removeEventListener("click", onClick); });
}
