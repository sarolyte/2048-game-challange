import { saveGame } from './localStorage.js';

export let board = [];

for (let i = 0; i < 4; i++) {
    board[i] = [0, 0, 0, 0]; //1 row,, iterrates 4 times ([0-3]). Every cell is  (empty)
}

export const generateRandomTile = () => {
    let emptyCells = [];
    //finds empty cells
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) {
                emptyCells.push([r, c]);
            }
        }
    }
    //inserts 2 in empty cell
    if (emptyCells.length > 0) {
        const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[r][c] = 2;
    }
    saveGame();
}

export const gameBoardContainer = document.getElementById('gameBoard');

export const renderBoard = () => {
    gameBoardContainer.innerHTML = "";

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const tile = document.createElement("div"); //creates div for each tile
            tile.classList.add("tile");
            const value = board[r][c];
            tile.textContent = value !== 0 ? value : ""; //if tile is not 0, it shows the number

            if (value >= 128) {
                tile.classList.add(`tileBiggerThan64`);
            } 
            else if (value === 0) {
                tile.classList.add(`emptyTile`);
            }
            else {
                tile.classList.add(`tile${value}`, 'tileShadow');
            }

            gameBoardContainer.appendChild(tile);
        }
    }
}

export const resetBoard = () => {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            board[r][c] = 0;
        }
    }
    generateRandomTile();
    generateRandomTile();
    renderBoard();
};
