import { resetBoard, renderBoard } from './gameBoard.js';
import { resetScore, getScore, getBestScore} from './score.js';
import { saveGame } from './localStorage.js';
import { hideModal } from './modal.js';

const scoreNo = document.getElementById('scoreNo');
const bestScoreNo = document.getElementById('bestScoreNo');

export const startNewGame = () => {
    resetScore(); //clears current score
    resetBoard(); //generates two fresh tiles
    renderBoard(); //shows the new board

    scoreNo.textContent = getScore();
    bestScoreNo.textContent = getBestScore();

    hideModal();

    saveGame();
};