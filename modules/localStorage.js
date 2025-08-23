import { board, renderBoard } from './gameBoard.js';
import { getScore, getBestScore, resetScore, increaseScore, setBestScore } from './score.js';

export const saveGame = () => {
    const gameState = {
        board,
        score: getScore(),
        bestScore: getBestScore()
    }
    localStorage.setItem('gameState', JSON.stringify(gameState));
};

export const loadGame = () => {
    const savedState = JSON.parse(localStorage.getItem('gameState'));
    console.log('Loaded:', savedState);
    if (savedState && savedState.board) {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                board[r][c] = savedState.board[r][c];
            }
        }

        resetScore(); //clears the score
        increaseScore(savedState.score); //restores score - loads the previous score 
        setBestScore(savedState.bestScore || 0);
        renderBoard();
        return true;
    }

    return false;
};