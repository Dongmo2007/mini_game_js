const spuare = document.querySelectorAll(".sqr");
const statusplayer = document.querySelector("#statusplayer");
const resetbtn = document.querySelector("#resetbtn");
const condition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [1, 4, 7],
];
const posible = ["", "", "", "", "", "", "", "", ""];

let players = [{ name: "Player 1", Symbol: "O" }];
players.push({ name: "Player 2 ", Symbol: "X" });

let currentPlayer = 0;

let gameActive = true;

function checkWin() {
  for (let i = 0; i < condition.length; i++) {
    const [a, b, c] = condition[i];
    if (
      posible[a] !== "" &&
      posible[a] === posible[b] &&
      posible[a] === posible[c]
    ) {
      return true;
    }
  }
  return false;
}

function handleClick() {
  if (!gameActive) {
    return;
  }
  const index = parseInt(this.getAttribute("data-index"));
  if (posible[index] !== "") return;

  posible[index] = players[currentPlayer].Symbol;
  this.textContent = players[currentPlayer].Symbol;

  if (checkWin()) {
    statusplayer.style =
      "color: green; font-weight: bold;text-transform: uppercase";
    statusplayer.textContent = `${players[currentPlayer].name} wins!`;
    gameActive = false;
    return;
  }
  if (!posible.includes("")) {
    statusplayer.style =
      "color: red; font-weight: bold; text-transform: uppercase";
    statusplayer.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = (currentPlayer + 1) % 2;

  statusplayer.textContent = `${players[currentPlayer].name}'s turn`;
}

spuare.forEach((sqr) => sqr.addEventListener("click", handleClick));

resetbtn.addEventListener("click", function () {
  for (let i = 0; i < posible.length; i++) {
    posible[i] = "";
  }
  spuare.forEach((sqr) => (sqr.textContent = ""));
  currentPlayer = 0;
  gameActive = true;
  statusplayer.textContent = `${players[currentPlayer].name}'s turn`;
});
