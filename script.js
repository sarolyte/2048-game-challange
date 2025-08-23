import { generateRandomTile, renderBoard} from './modules/gameBoard.js';
import { handleKeyPress } from './modules/tileMovement.js';
import { getScore, getBestScore } from './modules/score.js'
import { saveGame, loadGame } from './modules/localStorage.js';
import { startNewGame } from './modules/newGame.js';


const scoreNo = document.getElementById('scoreNo');
const bestScoreNo = document.getElementById('bestScoreNo');

const gameStarted = loadGame();
// const boardIsEmpty = board.every(row => row.every(cell => cell === 0));

if (!gameStarted) {
    generateRandomTile(); //first tile
    generateRandomTile(); //second tile
    renderBoard();
    saveGame()
}

//movement
document.addEventListener('keydown', handleKeyPress);

// score
scoreNo.textContent = getScore();
bestScoreNo.textContent = getBestScore();

const newGameBtn = document.getElementById('newGameBtn');
newGameBtn.addEventListener('click', () => startNewGame())