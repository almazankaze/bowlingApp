// color array
let backgroundColors = ['#1976d2','#d50000','#388e3c','#8e24aa'];
let addBtn = document.getElementById('addButton');
let errorMessage = document.querySelector('.modal-body p');

addBtn.addEventListener('click',addPlayer);

function addPlayer() {

    if(numPlayers <= 4) {
        createPlayer();
        numPlayers++;
    }
    else {
        errorMessage.innerHTML = 'reached max total number of players';
        $('#errorModal').modal();
    }
}

function compareStr(str1, str2) {
    return str1 < str2 || str1 > str2 ? false : true;
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
    let cardHeader = document.createElement('a');
    cardHeader.href = '#collapseCard' + numPlayers;
    cardHeader.classList.add('d-block','card-header','text-white','py-3');
    cardHeader.setAttribute('data-toggle','collapse');
    cardHeader.setAttribute('role','button');
    cardHeader.setAttribute('aria-expanded','true');
    cardHeader.setAttribute('aria-controls','collapseCard' + numPlayers);
    cardHeader.style.backgroundColor = backgroundColors[numPlayers-1];
    let headerH6 = document.createElement('h6');
    headerH6.classList.add('font-weight-bold');
    let headerText = document.createTextNode('Player ' + numPlayers);
    headerH6.appendChild(headerText);
    cardHeader.appendChild(headerH6);

    // body for card
    let collapseDiv = document.createElement('div');
    collapseDiv.classList.add('collapse','show');
    collapseDiv.id = 'collapseCard' + numPlayers;
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // scoreboard of the player
    let scoreBoard = document.createElement('div');
    scoreBoard.classList.add('row','text-center');

    // create individual schema score column
    for(i = 1; i < 12; i++) {

        let col = document.createElement('div');
        col.classList.add('col-2','col-sm-1','border');

        let schemaRoundBox = document.createElement('div');
        schemaRoundBox.classList.add('row','schema','justify-content-center');
        let schemaRoundP = document.createElement('p');
        schemaRoundBox.classList.add('font-weight-bold');
        let schemaRoundText;

        if(i < 11) {
            schemaRoundText = document.createTextNode(i);
        }
        else {
            schemaRoundText = document.createTextNode('extra');
        }

        schemaRoundP.appendChild(schemaRoundText);
        schemaRoundBox.appendChild(schemaRoundP);

        let schemaScore = document.createElement('div');
        schemaScore.classList.add('row','topBorder');

        let score1 = document.createElement('div');
        score1.classList.add('col-6','col-lg-6');
        let score1P = document.createElement('p');
        score1P.classList.add('font-weight-bold');
        score1P.id = 'p' + numPlayers + 's1r' + i;
        let score1Text = document.createTextNode('-');
        score1P.appendChild(score1Text);
        score1.appendChild(score1P);
        schemaScore.appendChild(score1);

        let score2 = document.createElement('div');
        score2.classList.add('col-6','col-lg-6','specialBorder');
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
    inputDiv.classList.add('col-6','col-lg-2');
    let input = document.createElement('input');
    input.classList.add('form-control','marginTop');
    input.placeholder = 'knocked out pins';
    input.maxLength = 2;
    input.id = 'pInput' + numPlayers;
    inputDiv.appendChild(input);
    inputRow.appendChild(inputDiv);

    // create button
    let btnDiv = document.createElement('div');
    btnDiv.classList.add('col-3','col-lg-2');
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
    collapseDiv.appendChild(cardBody);

    // create a break
    let space = document.createElement('br');

    // add player card to DOM
    playerCard.appendChild(cardHeader);
    playerCard.appendChild(collapseDiv);
    list.appendChild(playerCard);
    list.appendChild(space);
}

// post scores for the game
function updateTotalScore(playerId) {

    let currFrame = players[playerId-1].currFrame;

    // check if the end of the game
    if(currFrame == 10) {
        if(!players[playerId-1].frameIsStrike(currFrame-1) && !players[playerId-1].frameIsSpare(currFrame-1)) {
            if(players[playerId-1].round === 2) {
                players[playerId-1].gameOver = true;
            }
        }
    }

    let frameScore = 0;
    let score = 0;

    for(let frame = 0; frame < currFrame; frame++) {
        
        let scoreBox = document.getElementById('p' + playerId + 't' + (frame+1))
        
        // if strike
        if(players[playerId-1].frameIsStrike(frame)) {

            // check if two rounds exist after this frame
            if(frameScore+2 < players[playerId-1].getScoreBoardSize()) {
                score += 10 + players[playerId-1].getFromScoreBoard(frameScore+1) + players[playerId-1].getFromScoreBoard(frameScore+2);
                scoreBox.innerHTML = score;
                frameScore++;
            }
        }

        // if spare
        else if(players[playerId-1].frameIsSpare(frame)) {

            // check there is a round after this frame
            if(frame+1 < currFrame) {
                score += 10 + players[playerId-1].getFromScoreBoard(frameScore+2);
                scoreBox.innerHTML = score;
                frameScore += 2;
            }
        }
        else {

            if(frameScore+1 < players[playerId-1].getScoreBoardSize()) {
                score += players[playerId-1].getFromScoreBoard(frameScore) + players[playerId-1].getFromScoreBoard(frameScore+1);
                frameScore += 2;

                if(players[playerId-1].round === 2 && currFrame != 11) {
                    scoreBox.innerHTML = score;
                }
            }
        }
    }

    players[playerId-1].score = score;
}

function extraFrame(frame, playerId, pinsKnockedOut) {

    // check if frame 10 was a spare to allow only one more roll
    if(players[playerId-1].frameIsSpare(9)) {
        players[playerId-1].round = 2;
    }

    // if strike
    if(pinsKnockedOut === 10) {

        let box = document.getElementById('p' + playerId + 's' + players[playerId-1].round + 'r' + frame);
        box.innerHTML = 'x';
        players[playerId-1].addToScoreBoard(pinsKnockedOut);
        players[playerId-1].addToSymbolBoard(frame-1, 'x');
        updateTotalScore(playerId);
        players[playerId-1].currFrameScore = 0;
        players[playerId-1].score = players[playerId-1].score + 10;
        players[playerId-1].round = players[playerId-1].round + 1;
    }
    // if spare
    else if(pinsKnockedOut + players[playerId-1].currFrameScore === 10) {

        let box = document.getElementById('p' + playerId + 's' + players[playerId-1].round + 'r' + frame);
        box.innerHTML = '/';
        players[playerId-1].addToScoreBoard(pinsKnockedOut);
        players[playerId-1].addToSymbolBoard(frame-1, '/');
        updateTotalScore(playerId);
        players[playerId-1].score = players[playerId-1].score + pinsKnockedOut;
        players[playerId-1].round = players[playerId-1].round + 1;
    }
    else {
        let box = document.getElementById('p' + playerId + 's' + players[playerId-1].round + 'r' + frame);
        box.innerHTML = pinsKnockedOut;
        players[playerId-1].addToScoreBoard(pinsKnockedOut);
        players[playerId-1].addToSymbolBoard(frame-1, 'NS');
        updateTotalScore(playerId);
        players[playerId-1].currFrameScore = pinsKnockedOut;
        players[playerId-1].score = players[playerId-1].score + pinsKnockedOut;
        players[playerId-1].round = players[playerId-1].round + 1;
    }

    //  end the game
    if(players[playerId-1].round === 3) {
        players[playerId-1].gameOver = true;
    }
}

// update frame
function postRoundScore(frame, playerId, pinsKnockedOut) {

    // if player got a strike
    if(players[playerId-1].round === 1 && pinsKnockedOut === 10) {
        
        let box = document.getElementById('p' + playerId + 's2r' + frame);
        box.innerHTML = 'x';
        
        players[playerId-1].addToScoreBoard(pinsKnockedOut);
        players[playerId-1].addToSymbolBoard(frame-1, 'x');
        updateTotalScore(playerId);
        players[playerId-1].currFrame = frame + 1;
    }
    // if player got a spare
    else if(players[playerId-1].round === 2 && (pinsKnockedOut + players[playerId-1].currFrameScore) === 10) {
        let box = document.getElementById('p' + playerId + 's2r' + frame);
        box.innerHTML = '/'

        players[playerId-1].addToScoreBoard(pinsKnockedOut);
        players[playerId-1].addToSymbolBoard(frame-1, '/');
        players[playerId-1].currFrameScore = 0;
        updateTotalScore(playerId);
        players[playerId-1].round = 1;
        players[playerId-1].currFrame = frame + 1;
    }
    else {
        let box = document.getElementById('p' + playerId + 's' + players[playerId-1].round + 'r' + frame);
        box.innerHTML = pinsKnockedOut;

        if(players[playerId-1].round === 1) {
            players[playerId-1].addToScoreBoard(pinsKnockedOut);
            players[playerId-1].currFrameScore = pinsKnockedOut;
            updateTotalScore(playerId);
            players[playerId-1].round = 2;
        }
        else {
            players[playerId-1].addToScoreBoard(pinsKnockedOut);
            players[playerId-1].addToSymbolBoard(frame-1, 'NS');
            players[playerId-1].currFrameScore = 0;
            updateTotalScore(playerId);
            players[playerId-1].currFrame = frame + 1;
            players[playerId-1].round = 1;
        }
    }
}

function getInput(btnId) {

    let input = document.getElementById('pInput' + btnId);
    let inputText = input.value;
    let inputVal = parseInt(input.value);
    let thisFrameScore = inputVal + players[btnId-1].currFrameScore;
    let frame = players[btnId-1].currFrame;

    input.value = '';

    // check input makes sense
    if(players[btnId-1].gameOver) {
        errorMessage.innerHTML = 'Game for this player is now over. Thanks for playing!';
        $('#errorModal').modal();
        return;
    }
    else if(thisFrameScore > 10) {
        errorMessage.innerHTML = 'total number of pins knocked out should not exceed 10';
        $('#errorModal').modal();
        return;
    }
    else if(inputText == '' || isNaN(inputText) || thisFrameScore < 0) {
        errorMessage.innerHTML = 'input should be a valid number between 0 and 10';
        $('#errorModal').modal();
        return;
    }

    // handle extra frame differently
    if(frame <= 10) {
        postRoundScore(frame, btnId, inputVal);
    }
    else {
        extraFrame(frame, btnId, inputVal);
    }
}

let numPlayers = 1;
let players = new Array();

// initialize the app with two players
for(j = 0; j < 2; j++) {
    setUp();
    numPlayers++;
}

// test function
function testInput(playerId) {

    let myInputs = [10,10,10,10,10,10,10,10,10,10,10,10];
    //let myInputs = [10,10,10,10,10,10,10,10,10,10,10,6];
    //let myInputs = [10,10,10,10,10,10,10,10,10,10,6,10];
    //let myInputs = [10,10,10,10,10,10,10,10,10,10,3,7];

    //let myInputs = [10,10,10,10,10,10,10,10,10,4,6,10];
    //let myInputs = [10,10,10,10,10,10,10,10,10,4,6,7];

    //let myInputs = [10,10,10,10,10,10,10,10,10,4,4];

    //let myInputs = [6,4,5,4,9,0,10,10,5,5,5,3,6,3,9,1,9,1,10];

    //let myInputs = [6,4,5,4,9,0,10,10,5,5,5,3,6,3,9,1,10];
    //let myInputs = [6,4,5,4,9,0,10,10,5,5,5,3,6,3,9,1,8,2];

    for(x of myInputs) {

        let thisFrameScore = x + players[playerId-1].currFrameScore;
        let frame = players[playerId-1].currFrame;

        // check input makes sense
        if(players[playerId-1].gameOver) {
            errorMessage.innerHTML = 'Game for this player is now over. Thanks for playing!';
            $('#errorModal').modal();
            return;
        }
        else if(thisFrameScore > 10) {
            errorMessage.innerHTML = 'total number of pins knocked out should not exceed 10';
            $('#errorModal').modal();
            return;
        }

        // handle extra frame differently
        if(frame <= 10) {
            postRoundScore(frame, playerId, x);
        }
        else {
            extraFrame(frame, playerId, x);
        }
    }
}