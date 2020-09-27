class Game {

    #currFrame;
    #currFrameScore;
    #round;
    #score;
    #scoreBoard;
    #symbolBoard;

    constructor() {
        this.#currFrame = 1;
        this.#round = 1;
        this.#score = 0;
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
}