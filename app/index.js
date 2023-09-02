var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var resultField = document.querySelector(".result-field");
var restartBtn = document.querySelector(".restart-btn");
var boxes = document.querySelectorAll(".box");
var defaultValue = {
    whichTurn: true,
    text: "",
    gameArray: new Array(9).fill(""),
    winningCases: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],
};
var gameValue = {};
function ontypingBox(e) {
    var target = e.target;
    target.textContent = gameValue.text;
    target.removeEventListener("click", onClick);
}
function updateGameArray(e) {
    var index = +e.target.id;
    gameValue.gameArray[index] = gameValue.text;
}
function checking() {
    if (gameValue.winningCases.length > 1) {
        gameValue.winningCases.forEach(function (el) {
            if (el.every(function (i) { return gameValue.gameArray[i] === gameValue.text; })) {
                removeOnclick();
                return (resultField.textContent = "".concat(gameValue.text, " is winning!"));
            }
            removeLosingCases(el);
        });
        if (gameValue.winningCases.length === 1) {
            var _a = gameValue.winningCases
                .flat()
                .map(function (e) { return gameValue.gameArray[e]; }), text1 = _a[0], text2 = _a[1];
            var lastRawText = text1 || text2;
            lastRawText === gameValue.text &&
                (resultField.textContent = "it's draw") &&
                removeOnclick();
        }
    }
    else {
        resultField.textContent = "it's draw";
    }
}
function onClick(e) {
    gameValue.text = gameValue.whichTurn ? "X" : "O";
    gameValue.whichTurn = !gameValue.whichTurn;
    ontypingBox(e);
    updateGameArray(e);
    checking();
}
function startGame() {
    gameValue = __assign({}, defaultValue);
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
    gameValue.gameArray.forEach(function (e, id) { return !e && boxes[id].removeEventListener("click", onClick); });
}
function removeLosingCases(arr) {
    // get winning cases without losing cases (because of raws are completed)
    var isRawIncludesX = arr.some(function (e) { return gameValue.gameArray[e] === "X"; });
    var isRawIncludesO = arr.some(function (e) { return gameValue.gameArray[e] === "O"; });
    isRawIncludesX &&
        isRawIncludesO &&
        (gameValue.winningCases = gameValue.winningCases.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(arr); }));
}
