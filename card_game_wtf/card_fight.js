let playerUnits = [];
let computerUnits = [];
let selectedUnit = null;
let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
const totalRounds = 5;

document.getElementById('fight-btn').addEventListener('click', fight);
document.getElementById('restart-btn').addEventListener('click', restartGame);

function drawUnits() {
    playerUnits = [];
    computerUnits = [];
    for (let i = 0; i < 5; i++) {
        playerUnits.push(createUnit());
        computerUnits.push(createUnit());
    }
    displayUnits();
}

function createUnit() {
    const health = Math.floor(Math.random() * 10) + 1;
    const strength = Math.floor(Math.random() * 10) + 1;
    return { health, strength };
}

function displayUnits() {
    const player1CardsContainer = document.getElementById('player1-cards');
    const player2CardsContainer = document.getElementById('player2-cards');

    player1CardsContainer.innerHTML = '';
    player2CardsContainer.innerHTML = '';

    playerUnits.forEach((unit, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<div>Health: ${unit.health}</div><div>Strength: ${unit.strength}</div>`;
        cardElement.addEventListener('click', () => selectUnit(index));
        player1CardsContainer.appendChild(cardElement);
    });

    computerUnits.forEach(() => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `<div>Health: ?</div><div>Strength: ?</div>`;
        player2CardsContainer.appendChild(cardElement);
    });
}

function selectUnit(index) {
    const player1CardsContainer = document.getElementById('player1-cards');
    const cards = player1CardsContainer.getElementsByClassName('card');
    for (let card of cards) {
        card.classList.remove('selected');
    }
    cards[index].classList.add('selected');
    selectedUnit = index;
    document.getElementById('fight-btn').disabled = false;
}

function fight() {
    const computerSelectedUnitIndex = Math.floor(Math.random() * 5);
    const playerUnit = playerUnits[selectedUnit];
    const computerUnit = computerUnits[computerSelectedUnitIndex];

    const player1BattleCard = document.getElementById('player1-battle-card');
    const player2BattleCard = document.getElementById('player2-battle-card');

    player1BattleCard.innerHTML = `<div>Health: ${playerUnit.health}</div><div>Strength: ${playerUnit.strength}</div>`;
    player2BattleCard.innerHTML = `<div>Health: ${computerUnit.health}</div><div>Strength: ${computerUnit.strength}</div>`;

    const result = determineWinner(playerUnit, computerUnit);
    document.getElementById('result').innerText = `Round ${currentRound}: ${result}`;

    if (result === 'Player 1 Wins!') {
        player1Score++;
    } else if (result === 'Computer Wins!') {
        player2Score++;
    }

    updateScoreboard();

    if (currentRound >= totalRounds) {
        endGame();
    } else {
        currentRound++;
        drawUnits();
        document.getElementById('fight-btn').disabled = true;
    }
}

function determineWinner(unit1, unit2) {
    const unit1Score = unit1.health + unit1.strength;
    const unit2Score = unit2.health + unit2.strength;

    if (unit1Score > unit2Score) {
        return 'Player 1 Wins!';
    } else if (unit2Score > unit1Score) {
        return 'Computer Wins!';
    } else {
        return 'It\'s a Tie!';
    }
}

function updateScoreboard() {
    document.getElementById('player1-score').innerText = `Player 1: ${player1Score}`;
    document.getElementById('player2-score').innerText = `Computer: ${player2Score}`;
}

function endGame() {
    let finalResult = '';
    if (player1Score > player2Score) {
        finalResult = 'Player 1 Wins the Game!';
    } else if (player2Score > player1Score) {
        finalResult = 'Computer Wins the Game!';
    } else {
        finalResult = 'The Game is a Tie!';
    }
    document.getElementById('result').innerText += `\n${finalResult}`;
    document.getElementById('fight-btn').disabled = true;
}

function restartGame() {
    player1Score = 0;
    player2Score = 0;
    currentRound = 1;
    selectedUnit = null;
    document.getElementById('result').innerText = '';
    updateScoreboard();
    drawUnits();
    document.getElementById('fight-btn').disabled = true;
    document.getElementById('player1-battle-card').innerHTML = '';
    document.getElementById('player2-battle-card').innerHTML = '';
}

window.onload = restartGame;
