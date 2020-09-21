const firstBtn = document.querySelector('.testBtn button');
let firstNum = document.querySelector('.testNum h2');
let myInput = document.getElementById("knockOutPins");

const button1 = document.getElementById("button1");

class Game {
    constructor() {
        this._frame = 1;
        this.round = 1;
        this._score = 0;
    }

    calcPinScore(numPins) {
        this._score = this._score + numPins;
        return this._score;
    }

    get score() {
        return this._score;
    }
}

let game = new Game();

firstBtn.addEventListener('click', getPinInput);
button1.addEventListener('click', getPinInput);

function getPinInput() {
    
    let numPins = parseInt(myInput.value);
    let score = game.calcPinScore(numPins);

    let otherScore = document.getElementById("score" + 1);

    otherScore.innerHTML = score;
}