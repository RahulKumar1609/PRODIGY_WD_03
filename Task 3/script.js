let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""]; // Represents the tic-tac-toe board

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

let gameActive = true;

function cellClicked(index) {
  if (gameActive && board[index] === "") {
    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("turn").textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkResult() {
  for (let combo of winningCombinations) {
    let [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      gameActive = false;
      document.getElementById("turn").textContent = `Player ${currentPlayer} wins!`;
      highlightWinningCombo(combo);
      return;
    }
  }
  if (!board.includes("")) {
    gameActive = false;
    document.getElementById("turn").textContent = "It's a draw!";
  }
}

function highlightWinningCombo(combo) {
  let [a, b, c] = combo;
  document.getElementById(`cell-${a}`).classList.add("winner");
  document.getElementById(`cell-${b}`).classList.add("winner");
  document.getElementById(`cell-${c}`).classList.add("winner");
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  document.getElementById("turn").textContent = `Player ${currentPlayer}'s turn`;
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}
