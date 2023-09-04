const resultField = document.querySelector(".result-field") as HTMLDivElement;
const restartBtn = document.querySelector(".restart-btn") as HTMLDivElement;
const boxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box");

type DefaultValueType = {
  whichTurn: boolean;
  text: string;
  usersList: string[];
  winningCases: Readonly<number[][]>;
};
const defaultValue: DefaultValueType = {
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

class MyGame {
  game: DefaultValueType;
  invokeOnclick: (event: MouseEvent) => void;

  constructor(defVal: DefaultValueType) {
    this.game = defVal;
    this.invokeOnclick = this.onClickBox.bind(this);
  }

  start() {
    this.game = JSON.parse(JSON.stringify(defaultValue));
    resultField.textContent = "";
    this.addOnclickIntoBoxes();
  }
  isWin(el: number[]): boolean {
    return el.every((i) => this.game.usersList[i] === this.game.text);
  }
  finishWithWin() {
    this.removeOnclickFromAllBoxes();
    resultField.textContent = `${this.game.text} is winning!`;
  }
  finishWithDraw() {
    this.removeOnclickFromAllBoxes();
    resultField.textContent = `it's draw`;
  }

  updateUsersList(e: MouseEvent): void {
    const index: number = +(e.target as HTMLDivElement).id;
    this.game.usersList[index] = this.game.text;
  }
  getUsertext(): string {
    const [text1, text2] = this.game.winningCases
      .flat()
      .map((e) => this.game.usersList[e]);
    return text1 || text2;
  }

  removeLosingCases(arr: number[]): void {
    // get winning cases without losing cases (because of raws includes both options)
    const isRawIncludesX = arr.some((e) => this.game.usersList[e] === "X");
    const isRawIncludesO = arr.some((e) => this.game.usersList[e] === "O");
    isRawIncludesX &&
      isRawIncludesO &&
      (this.game.winningCases = this.game.winningCases.filter(
        (e) => JSON.stringify(e) !== JSON.stringify(arr)
      ));
  }
  updateWinningCases() {
    if (this.game.winningCases.length > 1) {
      this.game.winningCases.forEach((el) => {
        this.isWin(el) ? this.finishWithWin() : this.removeLosingCases(el);
      });

      this.game.winningCases.length === 1 &&
        this.getUsertext() === this.game.text &&
        this.finishWithDraw();
    } else {
      this.finishWithDraw();
    }
  }

  onClickBox(e: MouseEvent) {
    this.game.text = this.game.whichTurn ? "X" : "O";
    this.game.whichTurn = !this.game.whichTurn;
    this.onTypingBox(e);
    this.updateUsersList(e);
    this.updateWinningCases();
  }
  onTypingBox(e: MouseEvent): void {
    const target = e.target as HTMLDivElement;
    target.textContent = this.game.text;
    this.removeOnclickFromBox(+target.id);
  }
  addOnclickIntoBoxes() {
    const _this = this;
    boxes.forEach((box, index) => {
      box.addEventListener("click", _this.invokeOnclick);
      box.id = index.toString();
      box.textContent = "";
    });
  }
  removeOnclickFromBox(id: number) {
    boxes[id].removeEventListener("click", this.invokeOnclick);
  }
  removeOnclickFromAllBoxes() {
    boxes.forEach((e) => e.removeEventListener("click", this.invokeOnclick));
  }
}
const newGame = new MyGame(defaultValue);
newGame.start();
restartBtn.addEventListener("click", () => newGame.start());
