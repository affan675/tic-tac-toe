let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function initBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.addEventListener("click", handleMove);
    boardElement.appendChild(div);
  });
}

function handleMove(event) {
  const index = event.target.dataset.index;
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWinner(currentPlayer)) {
    statusElement.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusElement.textContent = "🤝 It's a Draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameOver = false;
  statusElement.textContent = "Player X's Turn";
  initBoard();
}

// 🟢 FIX: wait until page loads
window.onload = initBoard;
