class Game {

    #currFrame;
    #currFrameScore;
    #round;
    #score;
    #scoreBoard;
    #symbolBoard;
    #gameOver;

    constructor() {
        this.#currFrame = 1;
        this.#currFrameScore = 0;
        this.#round = 1;
        this.#score = 0;
        this.#gameOver = false;
        this.#scoreBoard = [];
        this.#symbolBoard = [];

        for(let i = 0; i < 11; i++) {
            this.#symbolBoard.push('-');
        }
    }

    addToScoreBoard(score) {
        this.#scoreBoard.push(score);
    }

    getFromScoreBoard(index) {
        return this.#scoreBoard[index];
    }

    addToSymbolBoard(index, symbol) {
        this.#symbolBoard[index] = symbol;
    }

    getFromSymbolBoard(index) {
        return this.#symbolBoard[index];
    }

    getScoreBoardSize() {
        return this.#scoreBoard.length;
    }

    frameIsStrike(index) {
        return compareStr(this.#symbolBoard[index], 'x');
    }

    frameIsSpare(index) {
        return compareStr(this.#symbolBoard[index], '/');
    }

    set score(newScore) {
        this.#score = newScore;
    }

    get score() {
        return this.#score;
    }

    set round(newRound) {
        this.#round = newRound;
    }

    get round() {
        return this.#round;
    }

    get currFrame() {
        return this.#currFrame;
    }

    set currFrame(num) {
        this.#currFrame = num;
    }

    get currFrameScore() {
        return this.#currFrameScore;
    }

    set currFrameScore(score) {
        this.#currFrameScore = score;
    }

    get gameOver() {
        return this.#gameOver;
    }

    set gameOver(state) {
        this.#gameOver = state;
    }
}