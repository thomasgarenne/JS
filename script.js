//DOM
const game = document.getElementById('game');
const display = document.getElementById('display');
let add = document.getElementById('add');
let newGame = document.getElementById('newGame');
let dice = document.getElementById('dice');
let hold = document.getElementById('hold');
let deDisplay = document.getElementById('deDisplay');

//VARIABLE
let resultDe = 0;
let currentScore = 0;
let totalScore = 0;
let numberPlayer = 0;
let numberUp = 50;

let i = 1; // compteur index pour joueur actif !
let clicked = false;

let allPlayer = []; //tableau des joueurs

let playerCurrentScore;
let playerTotalScore;
let joueurActif = 'player1';

let score1 = 0;
let score2 = 0;
let score3 = 0;
let score4 = 0;

//EVENT
dice.addEventListener('click', start)
hold.addEventListener('click', saveScore)
add.addEventListener('click', newPlayer)
newGame.addEventListener('click', newGameAll)

//FUNCTION
function start(){
    playerActive()
    lanceDe()
    score()
    win(numberUp)
}

function win(nb){
    if(totalScore >= nb){
        alert('gagné')
    }
}

function newGameAll(){
    numberPlayer = 0
    display.innerHTML = ''
    deDisplay.innerHTML = ''
    totalScore = 0
    currentScore = 0
    score1 = 0;
    score2 = 0;
    score3 = 0;
    score4 = 0;
    playerCurrentScore.innerHTML = ''
    playerTotalScore.innerHTML = ''
    allPlayer = []
}

function newPlayer(){
    numberPlayer ++

    let player = document.createElement('div');
    player.dataset.player = 'player' + numberPlayer
    display.appendChild(player)

    allPlayer.push(player)

    let namePlayer = document.createElement('h2');
    namePlayer.innerHTML = 'player ' + numberPlayer
    player.appendChild(namePlayer)

    playerCurrentScore = document.createElement('div');
    playerCurrentScore.id = 'playerCurrentScore' + numberPlayer
    player.appendChild(playerCurrentScore)

    playerTotalScore = document.createElement('div');
    playerTotalScore.id = 'playerTotalScore' + numberPlayer
    player.appendChild(playerTotalScore)
}

function saveScore(){ 

    if(joueurActif == 'player1'){
        score1 = score1 + currentScore
        totalScore = score1
    }
    if(joueurActif == 'player2'){
        score2 = score2 + currentScore
        totalScore = score2
    }
    if(joueurActif == 'player3'){
        score3 = score3 + currentScore
        totalScore = score3
    }
    if(joueurActif == 'player4'){
        score4 = score4 + currentScore
        totalScore = score4
    } 

    allPlayer.forEach(element => {
        if(element.dataset.player == joueurActif){
            playerTotalScore = element.lastElementChild
            playerTotalScore.innerHTML = totalScore
        }
    })

    currentScore = 0;
    clicked = true;
}

function score(){
    resultDe = lanceDe()
    deDisplay.innerHTML = resultDe

    allPlayer.forEach(element => {
        if(element.dataset.player == joueurActif){
            if(resultDe > 1){
                currentScore = currentScore + resultDe
                let firstEle = element.firstChild // on selection le 1er element h2 
                playerCurrentScore = firstEle.nextElementSibling //pour venir selectionner le 2nd (currentScore)
                playerCurrentScore.innerHTML = currentScore
            } else {
                currentScore = 0;
                playerCurrentScore.innerHTML = currentScore
            }
        }
    });
}

function lanceDe(){
    return Math.floor(Math.random()*6 + 1)
}

function playerActive(){
    if(i == allPlayer.length){
        i = 0;
    }
    
    if(resultDe == 1 || clicked){
        joueurActif = allPlayer[i].dataset.player
        i++
    }
    
    clicked = false;
}