var resultField = document.querySelector(".result-field");
var restartBtn = document.querySelector(".restart-btn");
var boxes = document.querySelectorAll(".box");
var defaultValue = {
    whichTurn: true,
    text: "",
    usersList: Array(9).fill(""),
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
var MyGame = /** @class */ (function () {
    function MyGame(defVal) {
        this.game = defVal;
        this.invokeOnclick = this.onClickBox.bind(this);
    }
    MyGame.prototype.start = function () {
        this.removeOnclickFromAllBoxes();
        this.game = JSON.parse(JSON.stringify(defaultValue));
        resultField.textContent = "";
        this.addOnclickIntoBoxes();
    };
    MyGame.prototype.isWin = function (el) {
        var _this_1 = this;
        return el.every(function (i) { return _this_1.game.usersList[i] === _this_1.game.text; });
    };
    MyGame.prototype.finish = function (text) {
        this.removeOnclickFromAllBoxes();
        resultField.textContent = text ? "".concat(text, " is winning!") : "it's draw";
    };
    MyGame.prototype.updateUsersList = function (e) {
        var index = +e.target.id;
        this.game.usersList[index] = this.game.text;
    };
    MyGame.prototype.getUsertext = function () {
        var _this_1 = this;
        var _a = this.game.winningCases
            .flat()
            .map(function (e) { return _this_1.game.usersList[e]; }), text1 = _a[0], text2 = _a[1];
        return text1 || text2;
    };
    MyGame.prototype.removeLosingCases = function (arr) {
        var _this_1 = this;
        // get winning cases without losing cases (because of raws includes both options)
        var isRawIncludesX = arr.some(function (e) { return _this_1.game.usersList[e] === "X"; });
        var isRawIncludesO = arr.some(function (e) { return _this_1.game.usersList[e] === "O"; });
        isRawIncludesX &&
            isRawIncludesO &&
            (this.game.winningCases = this.game.winningCases.filter(function (e) { return JSON.stringify(e) !== JSON.stringify(arr); }));
    };
    MyGame.prototype.updateWinningCases = function () {
        var _this_1 = this;
        if (this.game.winningCases.length > 1) {
            this.game.winningCases.forEach(function (el) {
                _this_1.isWin(el)
                    ? _this_1.finish(_this_1.game.text)
                    : _this_1.removeLosingCases(el);
            });
            this.game.winningCases.length === 1 &&
                this.getUsertext() === this.game.text &&
                this.finish();
        }
        else {
            this.finish();
        }
    };
    MyGame.prototype.onClickBox = function (e) {
        this.game.text = this.game.whichTurn ? "X" : "O";
        this.game.whichTurn = !this.game.whichTurn;
        this.onTypingBox(e);
        this.updateUsersList(e);
        this.updateWinningCases();
    };
    MyGame.prototype.onTypingBox = function (e) {
        var target = e.target;
        target.textContent = this.game.text;
        this.removeOnclickFromBox(+target.id);
    };
    MyGame.prototype.addOnclickIntoBoxes = function () {
        var _this = this;
        boxes.forEach(function (box, index) {
            console.log("from add", this);
            box.addEventListener("click", _this.invokeOnclick);
            box.id = index.toString();
            box.textContent = "";
        });
    };
    MyGame.prototype.removeOnclickFromBox = function (id) {
        boxes[id].removeEventListener("click", this.invokeOnclick);
    };
    MyGame.prototype.removeOnclickFromAllBoxes = function () {
        var _this = this;
        boxes.forEach(function (e) { 
            console.log("from remove", this);
            return e.removeEventListener("click", _this.invokeOnclick); 
    });
    };
    return MyGame;
}());
var newGame = new MyGame(defaultValue);
newGame.start();
restartBtn.addEventListener("click", function () { return newGame.start(); });
