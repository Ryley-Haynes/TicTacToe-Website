let currentPlayer = 'X';
const players = ['X', 'O'];
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

function initializeBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    boardElement.innerHTML = '';
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => handleCellClick(row, col));
            boardElement.appendChild(cell);
        }
    }
    messageElement.textContent = `${currentPlayer}'s Turn`;
}

function handleCellClick(row, col) {
    if (board[row][col] === '' && !checkWinner()) {
        board[row][col] = currentPlayer;
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.textContent = currentPlayer; 
        cell.classList.add(currentPlayer.toLowerCase()); 

        updateBoard();
        if (checkWinner()) {
            messageElement.textContent = `${currentPlayer} Wins!`;
        } else if (checkTie()) {
            messageElement.textContent = 'Tie!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `${currentPlayer}'s Turn`;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        cell.textContent = board[row][col];
    });
}

function checkWinner() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
            return true;
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
            return true;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
        return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
        return true;
    }
    return false;
}

function checkTie() {
    return board.flat().every(cell => cell !== '');
}

resetButton.addEventListener('click', initializeBoard);

// Initialize the board when the page loads
initializeBoard();
