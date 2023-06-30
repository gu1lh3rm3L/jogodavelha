const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;

const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    currentPlayer = 'X';
}

const resetScoreButton = document.getElementById('resetScoreButton');
resetScoreButton.addEventListener('click', resetScore);

function resetScore() {
    scoreX = 0;
    scoreO = 0;
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
}


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const clickedCell = event.target;

    if (clickedCell.textContent !== '') {
        return;
    }

    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        // Incrementar o placar do jogador atual
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }

    if (checkDraw()) {
        alert('Empate!');
        resetGame();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;

        if (
            cells[a].textContent === currentPlayer &&
            cells[b].textContent === currentPlayer &&
            cells[c].textContent === currentPlayer
        ) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return Array.from(cells).every(cell => cell.textContent !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    currentPlayer = 'X';
}