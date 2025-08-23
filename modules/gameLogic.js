import { board } from './gameBoard.js';
import { showModal } from './modal.js';
import { getScore, getBestScore, setBestScore } from './score.js';
import { startNewGame } from './newGame.js';


//win condition
export const checkWinCondition = () => {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 2048) {
                //making sure the best score is not updated on a page reload
                if (getScore() > getBestScore()) {
                    setBestScore(getScore());
                };
                setTimeout(() => {
                    showModal('You won!', 'Play again', startNewGame);
                }, 400);
                return true;
            }   
        }
    }
    return false
}

//lose condition
export const checkLoseCondition = () => {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            //checks whether there's a zero. If so, the moves are still possible
            if (board[r][c] === 0) return false;

            //checks whether any tile can merge with one on the right. Index 3 is used so it would be possible to compare with the following tile
            if (c < 3 && board[r][c] === board[r][c + 1]) return false;

            //checks whether any tile can merge with the one below
            if (r < 3 && board[r][c] === board[r + 1][c]) return false;
        }
    }
    //making sure the best score is not updated on a page reload
    if (getScore() > getBestScore()) {
        setBestScore(getScore());
    };
    setTimeout(() => {
        showModal('Game over, you lost', 'Play again', startNewGame);
    }, 400);
    return true;
}
