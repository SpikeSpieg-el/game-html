let playerMage;
let opponentMage;
let playerHealth = 10;
let opponentHealth = 10;

function selectMage(mage) {
  playerMage = mage;
  document.getElementById('character-selection').style.display = 'none';
  document.getElementById('battle').style.display = 'block';
  document.getElementById('result').innerHTML = '';
  opponentMage = Math.random() < 0.5 ? 'Маг 1' : 'Маг 2'; // выбираем противника случайным образом
  displayStatus();
}

function performAction(action) {
  const opponentAction = getRandomAction();
  let playerDamage = 0;
  let opponentDamage = 0;

  if (action === 'Атака') {
    playerDamage = 2;
    opponentDamage = opponentAction === 'Защита' ? 0 : 2;
  } else if (action === 'Защита') {
    opponentDamage = opponentAction === 'Атака' ? 0 : 2;
  } else if (action === 'Подготовка') {
    playerDamage = 2;
  }

  playerHealth -= opponentDamage;
  opponentHealth -= playerDamage;
  displayResult(action, opponentAction, playerDamage, opponentDamage);
  displayStatus();
  
  if (playerHealth <= 0 || opponentHealth <= 0) {
    endGame();
  }
}

function getRandomAction() {
  const actions = ['Атака', 'Защита'];
  if (opponentAction === 'Подготовка') {
    actions.splice(actions.indexOf('Подготовка'), 1);
  }
  return actions[Math.floor(Math.random() * actions.length)];
}

function displayResult(playerAction, opponentAction, playerDamage, opponentDamage) {
  const result = document.getElementById('result');
  result.innerHTML = 'Вы ' + playerAction.toLowerCase() + ', противник ' + opponentAction.toLowerCase() + '.<br>';
  if (playerDamage > 0) {
    result.innerHTML += 'Вы нанесли ' + playerDamage + ' урона.';
  }
  if (opponentDamage > 0) {
    result.innerHTML += ' Противник нанес ' + opponentDamage + ' урона.';
  }
}

function displayStatus() {
  document.getElementById('result').innerHTML += '<br><br>';
  document.getElementById('result').innerHTML += 'Ваше здоровье: ' + playerHealth + '<br>';
  document.getElementById('result').innerHTML += 'Здоровье противника: ' + opponentHealth;
}

function endGame() {
  let message = '';
  if (playerHealth <= 0 && opponentHealth <= 0) {
    message = 'Ничья!';
  } else if (playerHealth <= 0) {
    message = 'Вы проиграли!';
  } else {
    message = 'Вы победили!';
  }
  
  document.getElementById('result').innerHTML += '<br><br>';
  document.getElementById('result').innerHTML += message;
  document.getElementById('actions').style.display = 'none';
}
