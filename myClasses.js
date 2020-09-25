class Frame {
    #score1;
    #score2;
    #scoreType;
    #frameScore;
    #isDone;

    constructor() {
        this.#score1 = 0;
        this.#score2 = 0;
        this.#scoreType = 'NONE';
        this.#frameScore = 0;
        this.#isDone = false;
    }

    get score1() {
        return this.#score1;
    }

    set score1(newScore) {
        this.#score1 = newScore;
    }

    get score2() {
        return this.#score2;
    }

    set score2(newScore) {
        this.#score2 = newScore;
    }

    get scoreType() {
        return this.#scoreType;
    }

    set scoreType(newType) {
        this.#scoreType = newType;
    }

    get frameScore() {
        return this.#frameScore;
    }

    set frameScore(newScore) {
        this.#frameScore = newScore
    }

    get isDone() {
        return this.#isDone;
    }

    set isDone(done) {
        this.#isDone = true;
    }
}

class Game {

    #currFrame;
    #round;
    #score;
    #scoreBoard;

    constructor() {
        this.#currFrame = 1;
        this.#round = 1;
        this.#score = 0;
        this.#scoreBoard = new Array(11);

        for(let frame = 0; frame < 11; frame++) {
            let frameObj = new Frame();
            this.#scoreBoard[frame] = frameObj;
        }
    }

    getFrame(frameNum) {
        return this.#scoreBoard[frameNum];
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
}