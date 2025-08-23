export let score = 0;
export let bestScore = 0;

export const getScore = () => score;
export const getBestScore = () => bestScore;

export const setBestScore = (value) => {
    bestScore = value;
};

export const resetScore = () => {
    score = 0;
};

export const increaseScore = (value) => {
    score += value;
}