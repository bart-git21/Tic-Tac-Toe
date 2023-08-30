const resultField = document.querySelector(".result-field") as HTMLDivElement;
const restartBtn = document.querySelector(".restart-btn") as HTMLDivElement;
const boxes: NodeListOf<HTMLDivElement> = document.querySelectorAll(".box");
let whichTurn = true;
let userText = "";
let gameArray: string[] = [];

type MultiArrayType = number[][];
const winningCases: Readonly<MultiArrayType> = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentWinningCases: MultiArrayType = [];

function clickOnBox(e: MouseEvent): void {
  const target = e.target as HTMLDivElement;
  target.textContent = userText;
  target.removeEventListener("click", onClick);
}
function pushArray(e: MouseEvent): void {
  const targetId: number = +(e.target as HTMLDivElement).id;
  gameArray[targetId] = userText;
}
function checking() {
  if (currentWinningCases.length > 1) {
    currentWinningCases.forEach((el) => {
      if (el.every((i) => gameArray[i] === userText)) {
        removeOnclick();
        return (resultField.textContent = `${userText} is winning!`);
      }
      const isRawIncludesX = el.some((e) => gameArray[e] === "X");
      const isRawIncludesO = el.some((e) => gameArray[e] === "O");
      isRawIncludesX &&
        isRawIncludesO &&
        (currentWinningCases = currentWinningCases.filter(
          (e) => JSON.stringify(e) !== JSON.stringify(el)
        ));
    });
    if (currentWinningCases.length === 1) {
      const lastClearRawText =
        gameArray[currentWinningCases[0][0]] ||
        gameArray[currentWinningCases[0][1]];
      lastClearRawText === userText &&
        (resultField.textContent = `it's draw`) &&
        removeOnclick();
    }
  } else {
    resultField.textContent = `it's draw`;
  }
}
function onClick(e: MouseEvent) {
  userText = whichTurn ? "X" : "O";
  whichTurn = !whichTurn;
  clickOnBox(e);
  pushArray(e);
  checking();
}
function startGame() {
  currentWinningCases = [...winningCases];
  gameArray = [...Array(9).fill("")];
  whichTurn = true;
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
  gameArray.forEach(
    (e, id) => !e && boxes[id].removeEventListener("click", onClick)
  );
}
