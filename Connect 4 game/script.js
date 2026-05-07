const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = "red";
let gameOver = false;

const boardDiv = document.getElementById("board");
const statusDiv = document.getElementById("status");

function createBoard() {
  board = Array.from({ length: rows }, () => Array(cols).fill(null));
  boardDiv.innerHTML = "";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => dropDisc(c));
      boardDiv.appendChild(cell);
    }
  }
}

function dropDisc(col) {
  if (gameOver) return;

  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][col]) {
      board[r][col] = currentPlayer;
      updateBoard();
      if (checkWin(r, col)) {
        statusDiv.textContent = `${capitalize(currentPlayer)} Wins!`;
        gameOver = true;
        return;
      }
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      statusDiv.textContent = `${capitalize(currentPlayer)}'s Turn`;
      return;
    }
  }
}

function updateBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = boardDiv.children[r * cols + c];
      cell.classList.remove("red", "yellow");
      if (board[r][c]) {
        cell.classList.add(board[r][c]);
      }
    }
  }
}

function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // vertical
    checkDirection(row, col, 0, 1) || // horizontal
    checkDirection(row, col, 1, 1) || // diagonal down-right
    checkDirection(row, col, 1, -1)   // diagonal down-left
  );
}

function checkDirection(row, col, dr, dc) {
  let count = 1;

  count += countDiscs(row, col, dr, dc);
  count += countDiscs(row, col, -dr, -dc);

  return count >= 4;
}

function countDiscs(row, col, dr, dc) {
  let r = row + dr;
  let c = col + dc;
  let count = 0;

  while (
    r >= 0 &&
    r < rows &&
    c >= 0 &&
    c < cols &&
    board[r][c] === currentPlayer
  ) {
    count++;
    r += dr;
    c += dc;
  }

  return count;
}

function resetGame() {
  currentPlayer = "red";
  gameOver = false;
  statusDiv.textContent = "Red's Turn";
  createBoard();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

createBoard();
