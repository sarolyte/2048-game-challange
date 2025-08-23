import { board, generateRandomTile, renderBoard } from './gameBoard.js';
import { checkWinCondition, checkLoseCondition } from './gameLogic.js';
import { increaseScore, getScore, getBestScore, } from './score.js';
import { saveGame } from './localStorage.js';

const scoreNo = document.getElementById('scoreNo');


export const handleKeyPress = (event) => {
    //checking if the key is one in the moveFunction
    const moveFn = moveFunctions[event.key];

    if (moveFn) {
        const moved = moveFn();
        //if board changes, new tile is added and the board is rendered again
        if (moved) {
            generateRandomTile();
            renderBoard();
            scoreNo.textContent = getScore();
            bestScoreNo.textContent = getBestScore();
            checkWinCondition();
            checkLoseCondition();
            saveGame(); //saves only after moves were made
        }
    }
}


export const slide = (row) => {
    //removes zeros, simulates sliding action
    row = row.filter(num => num !== 0);

    //merges tiles - checks each pair of numbers from first to the second from the end
    for (let i = 0; i < row.length - 1; i++) {
        //compares numbers by index to the ones after them
        if (row[i] === row[i + 1]) {
            row[i] *= 2; //multiplies the current number by 2
            row[i + 1] = 0; //after merging, next tile becomes empty (0)

            increaseScore(row[i]);
        }
    }

    //removes zeros again and fills remaining with zeros
    row = row.filter(num => num !== 0);
    //untile row has 4 numbers
    while (row.length < 4) {
        row.push(0);
    }

    //returns new row
    return row;
}

export const moveLeft = () => {
    let moved = false; //to check if any row changed

    for (let r = 0; r < 4; r++) { //goes through each row
        const original = [...board[r]];
        const newRow = slide(board[r]);
        board[r] = newRow;

        //if row changed - moved changes to true
        if (!arraysEqual(original, newRow)) {
            moved = true;
        }
    }

    return moved;
}

export const moveRight = () => {
    let moved = false;

    for (let r = 0; r < 4; r++) {
        const original = [...board[r]];
        const reversed = [...board[r]].reverse(); //so "slide" could be used. Slide works only to the left (row[i+1] = 0 and row.push(0))
        const newRow = slide(reversed).reverse(); //after sliding, reverse it again
        board[r] = newRow;

        if (!arraysEqual(original, newRow)) {
            moved = true;
        }
    }

    return moved;
}

export const moveUp = () => {
    let moved = false; //for column

    for (let c = 0; c < 4; c++) { //loops over each column
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]]; //array of one column
        const original = [...col];
        const newCol = slide(col); //column array - like a row. Slide was made for rows, so now it can be used for column

        for (let r = 0; r < 4; r++) {
            board[r][c] = newCol[r]; //puts the columns (rows) from newCol back to column (c) position by index (r) 
        }

        if (!arraysEqual(original, newCol)) {
            moved = true;
        }
    }

    return moved;
}

export const moveDown = () => {
    let moved = false;

    for (let c = 0; c < 4; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        const original = [...col];
        const reversed = [...col].reverse(); //reverses the column
        const newCol = slide(reversed).reverse(); //slide is done on reveresed column and is reversed again

        for (let r = 0; r < 4; r++) {
            board[r][c] = newCol[r];
        }

        if (!arraysEqual(original, newCol)) {
            moved = true;
        }
    }

    return moved;
}

export const arraysEqual = (a, b) => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

//connecting names to functions
export const moveFunctions = {
    ArrowLeft: moveLeft,
    ArrowRight: moveRight,
    ArrowUp: moveUp,
    ArrowDown: moveDown
};