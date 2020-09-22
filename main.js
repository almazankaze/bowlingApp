class Game {

    #frame;
    #round;
    #score;
    #symbolBoard
    #scoreBoard

    constructor() {
        this.#frame = 1;
        this.#round = 1;
        this.#score = 0;
        this.#symbolBoard = new Array();
        this.#scoreBoard = new Array();
    }

    updateGameState() {
        this.#frame++;
    }

    set score(numPins) {
        this.updateGameState();
    }

    get score() {
        return this.#score;
    }

    get round() {
        return this.#round;
    }

    get frame() {
        return this.#frame;
    }
}

function setUp() {
    createPlayer();
}

// creates the scoreboard for a player
function createPlayer() {

    players[numPlayers-1] = new Game();

    let list = document.getElementById("scoreArea");

    // create player card
    let playerCard = document.createElement('div');
    playerCard.classList.add('card','shadow');
    playerCard.id = 'player' + numPlayers;

    // header for card
    let cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header','bg-info','text-white');
    let headerH6 = document.createElement('h6');
    headerH6.classList.add('font-weight-bold');
    let headerText = document.createTextNode('Player ' + numPlayers);
    headerH6.appendChild(headerText);
    cardHeader.appendChild(headerH6);

    // body for card
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // scoreboard of the player
    let scoreBoard = document.createElement('div');
    scoreBoard.classList.add('row','text-center');

    // create individual schema score column
    for(i = 1; i < 11; i++) {

        let col = document.createElement('div');
        col.classList.add('col-2','col-sm-1','border');

        let schemaRoundBox = document.createElement('div');
        schemaRoundBox.classList.add('row','schema','justify-content-center');
        let schemaRoundP = document.createElement('p');
        schemaRoundBox.classList.add('font-weight-bold');
        let schemaRoundText = document.createTextNode(i);
        schemaRoundP.appendChild(schemaRoundText);
        schemaRoundBox.appendChild(schemaRoundP);

        let schemaScore = document.createElement('div');
        schemaScore.classList.add('row','topBorder');

        let score1 = document.createElement('div');
        score1.classList.add('col-6','col-sm-6');
        let score1P = document.createElement('p');
        score1P.classList.add('font-weight-bold');
        score1P.id = 'p' + numPlayers + 's1r' + i;
        let score1Text = document.createTextNode('-');
        score1P.appendChild(score1Text);
        score1.appendChild(score1P);
        schemaScore.appendChild(score1);

        let score2 = document.createElement('div');
        score2.classList.add('col-6','col-sm-6','specialBorder');
        let score2P = document.createElement('p');
        score2P.classList.add('font-weight-bold');
        score2P.id = 'p' + numPlayers + 's2r' + i;
        let score2Text = document.createTextNode('-');
        score2P.appendChild(score2Text);
        score2.appendChild(score2P);
        schemaScore.appendChild(score2);

        let totalScore = document.createElement('p');
        totalScore.classList.add('font-weight-bold','padtop','score');
        totalScore.id = 'p' + numPlayers + 't' + i;
        let totalScoreText = document.createTextNode('-');
        totalScore.appendChild(totalScoreText);

        col.appendChild(schemaRoundBox);
        col.appendChild(schemaScore);
        col.appendChild(totalScore);
        scoreBoard.appendChild(col);
    }

    cardBody.appendChild(scoreBoard);

    // create form row
    let inputRow = document.createElement('div');
    inputRow.classList.add('row');

    // create input
    let inputDiv = document.createElement('div');
    inputDiv.classList.add('col-6','col-sm-2');
    let input = document.createElement('input');
    input.classList.add('form-control','marginTop');
    input.placeholder = 'knocked out pins';
    input.maxLength = 2;
    input.id = 'pInput' + numPlayers;
    inputDiv.appendChild(input);
    inputRow.appendChild(inputDiv);

    // create button
    let btnDiv = document.createElement('div');
    btnDiv.classList.add('col-3','col-sm-2');
    let btn = document.createElement('button');
    btn.classList.add('btn','btn-primary','shadow-sm','marginTop');
    btn.type = 'submit';
    btn.id = numPlayers;
    btn.addEventListener('click', function(){ getInput(btn.id); });
    let btnText = document.createTextNode('Submit');
    btn.appendChild(btnText);
    btnDiv.appendChild(btn);
    inputRow.appendChild(btnDiv);
    
    cardBody.appendChild(inputRow);

    // create a break
    let space = document.createElement('br');

    // add player card to DOM
    playerCard.appendChild(cardHeader);
    playerCard.appendChild(cardBody);
    list.appendChild(playerCard);
    list.appendChild(space);
}

function postRoundScore(playerId, pins) {

    if(pins === 10) {
        let box = document.getElementById('p' + playerId + 's2r' + players[playerId-1].frame);
        box.innerHTML = 'x';
    }
}

function getInput(btnId) {

    let input = parseInt(document.getElementById('pInput' + btnId).value);
    
    postRoundScore(btnId, input);
    players[btnId-1].updateGameState();
}

let numPlayers = 1;
let players = new Array();

// initialize the app with two players
for(j = 0; j < 2; j++) {
    setUp();
    numPlayers++;
}