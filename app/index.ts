const resultField = document.querySelector(".result-field") as HTMLDivElement;
const restartBtn = document.querySelector(".restart-btn") as HTMLDivElement;
const boxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box");

type DefaultValueType = {
  whichTurn: boolean;
  text: string;
  gameArray: string[];
  winningCases: Readonly<number[][]>;
};
const defaultValue: DefaultValueType = {
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
let gameValue: DefaultValueType = {} as DefaultValueType;

function ontypingBox(e: MouseEvent): void {
  const target = e.target as HTMLDivElement;
  target.textContent = gameValue.text;
  target.removeEventListener("click", onClick);
}
function updateGameArray(e: MouseEvent): void {
  const index: number = +(e.target as HTMLDivElement).id;
  gameValue.gameArray[index] = gameValue.text;
}
function checking() {
  if (gameValue.winningCases.length > 1) {
    gameValue.winningCases.forEach((el) => {
      if (el.every((i) => gameValue.gameArray[i] === gameValue.text)) {
        removeOnclick();
        return (resultField.textContent = `${gameValue.text} is winning!`);
      }
      removeLosingCases(el);
    });

    if (gameValue.winningCases.length === 1) {
      const [text1, text2] = gameValue.winningCases
        .flat()
        .map((e) => gameValue.gameArray[e]);
      const lastRawText = text1 || text2;
      lastRawText === gameValue.text &&
        (resultField.textContent = `it's draw`) &&
        removeOnclick();
    }
  } else {
    resultField.textContent = `it's draw`;
  }
}
function onClick(e: MouseEvent) {
  gameValue.text = gameValue.whichTurn ? "X" : "O";
  gameValue.whichTurn = !gameValue.whichTurn;
  ontypingBox(e);
  updateGameArray(e);
  checking();
}
function startGame() {
  gameValue = { ...defaultValue };
  resultField.textContent = "";

  boxes.forEach((e, index) => {
    e.addEventListener("click", onClick);
    e.id = index.toString();
    e.textContent = "";
  });
}
startGame();
restartBtn.addEventListener("click", startGame);

function removeOnclick() {
  // remove onClick from EMPTY boxes
  gameValue.gameArray.forEach(
    (e, id) => !e && boxes[id].removeEventListener("click", onClick)
  );
}
function removeLosingCases(arr: number[]): void {
  // get winning cases without losing cases (because of raws includes both options)
  const isRawIncludesX = arr.some((e) => gameValue.gameArray[e] === "X");
  const isRawIncludesO = arr.some((e) => gameValue.gameArray[e] === "O");
  isRawIncludesX &&
    isRawIncludesO &&
    (gameValue.winningCases = gameValue.winningCases.filter(
      (e) => JSON.stringify(e) !== JSON.stringify(arr)
    ));

    
    // ================== TODO
    // add case when raw includes two X and next value is O
    // this winningCase should be deleted
}
