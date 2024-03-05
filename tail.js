// Создаем карту
const mapElement = document.getElementById('map');
const mapSize = 10;
const map = [];
for (let i = 0; i < mapSize; i++) {
    map[i] = [];
    for (let j = 0; j < mapSize; j++) {
        map[i][j] = document.createElement('div');
        map[i][j].classList.add('tile');
        map[i][j].setAttribute('data-x', i);
        map[i][j].setAttribute('data-y', j);
        mapElement.appendChild(map[i][j]);
    }
}

// Устанавливаем игрока в начальную позицию (0, 0)
let playerX = 0;
let playerY = 0;
map[playerX][playerY].classList.add('player');

// Создаем врагов на случайных клетках
const numEnemies = 10; // Количество врагов
for (let i = 0; i < numEnemies; i++) {
    let enemyX = Math.floor(Math.random() * mapSize);
    let enemyY = Math.floor(Math.random() * mapSize);
    // Проверяем, чтобы враг не появился на клетке игрока
    while (enemyX === playerX && enemyY === playerY) {
        enemyX = Math.floor(Math.random() * mapSize);
        enemyY = Math.floor(Math.random() * mapSize);
    }
    map[enemyX][enemyY].classList.add('enemy');
    map[enemyX][enemyY].setAttribute('data-enemy', 'true');
}




// Создаем массив для хранения посещенных клеток
const visitedCells = [];

// Функция для перемещения игрока
function movePlayer(x, y) {
// Проверяем, является ли точка соседней или посещенной
if ((Math.abs(playerX - x) === 1 && playerY === y) ||
    (Math.abs(playerY - y) === 1 && playerX === x) ||
    visitedCells.find(cell => cell.x === x && cell.y === y)) {
    // Удаляем игрока из предыдущей позиции
    map[playerX][playerY].classList.remove('player');
    // Добавляем предыдущую клетку в массив посещенных
    visitedCells.push({ x: playerX, y: playerY });
    // Обновляем координаты игрока
    playerX = x;
    playerY = y;
    // Добавляем игрока в новую позицию
    map[playerX][playerY].classList.add('player');
    // Проверяем, если игрок на клетке с врагом
    if (map[playerX][playerY].getAttribute('data-enemy') === 'true') {
        if (playerHealth <= 0) {
            displayBattleModal();
        } else {
            // Проверяем, завершена ли игра
            if (playerHealth > 0) {
                // Сбрасываем состояние игры перед отображением нового окна битвы
                resetGame();
            }
            displayBattleModal();
        }
    }
    // Делаем соседние клетки активными
    updateActiveTiles();
}
}

// Функция для обновления активности клеток в зависимости от текущей позиции игрока
function updateActiveTiles() {
for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
        if ((Math.abs(playerX - i) === 1 && playerY === j) ||
            (Math.abs(playerY - j) === 1 && playerX === i) ||
            visitedCells.find(cell => cell.x === i && cell.y === j)) {
            map[i][j].classList.remove('inactive');
        } else {
            map[i][j].classList.add('inactive');
        }
    }
}
}

// Функция для отображения окна битвы
function displayBattleModal() {
    const battleModal = document.getElementById('battleModal');
    battleModal.style.display = 'flex';
}


// Функция для закрытия окна битвы и удаления врага
function closeBattleModalAndRemoveEnemy() {
    const battleModal = document.getElementById('battleModal');
    battleModal.style.display = 'none';
    // Удаление врага
    map[playerX][playerY].classList.remove('enemy');
    map[playerX][playerY].removeAttribute('data-enemy');
}

// Назначаем обработчики событий для каждой клетки карты
for (let i = 0; i < mapSize; i++) {
    for (let j = 0; j < mapSize; j++) {
        map[i][j].addEventListener('click', function() {
            if (!this.classList.contains('inactive')) {
                movePlayer(parseInt(this.getAttribute('data-x')), parseInt(this.getAttribute('data-y')));
            }
        });
    }
}

// Инициализируем активность клеток при загрузке страницы
updateActiveTiles();

// Обработчик события для кнопки "Продолжить" в окне битвы
const continueButton = document.getElementById('continueButton');
continueButton.addEventListener('click', closeBattleModalAndRemoveEnemy);


let playerHealth = 10;
    let enemyHealth = 10;
    let round = 1;
    let log = "";


function performAction(action) {
    let enemyAction = Math.random() < 0.33 ? 'attack' : Math.random() < 0.67 ? 'defend' : 'prepare';

    log += `Ход ${round}: Ты выбрал ${action}, противник выбрал ${enemyAction}.<br>`;

    if (action === 'attack') {
        if (enemyAction === 'defend') {
            // Player attacks, but enemy successfully defends
            playerHealth -= 2;
            log += `Ты атаковал, противник успешно защитился, он провёл контр атаку.<br>`;
        } else if (enemyAction === 'prepare') {
            // Player attacks, and enemy prepares
            enemyHealth -= 2;
            log += `Ты атаковал, противник готовился и получил урон -2.<br>`;
        } else {
            // Both attack, no damage taken
            log += `Ты атаковал, противник атаковал, но оба избежали урона.<br>`;
        }
    } else if (action === 'defend') {
        if (enemyAction === 'attack') {
            // Player successfully defends against enemy attack
            enemyHealth -=2;
            log += `Ты блокировал, противник атаковал, ты успешно защитился и контр атаковал.<br>`;
        } else if (enemyAction === 'prepare') {
            // Player defends, but enemy prepares (no damage dealt)
            playerHealth -= 2;
            log += `Ты блокировал, противник готовился, ты получил -2.<br>`;
        }
    } else if (action === 'prepare') {
        if (enemyAction === 'attack') {
            // Player prepares, but enemy attacks
            playerHealth -= 2;
            log += `Ты готовился, противник атаковал, ты получил урон -2.<br>`;
        } else if (enemyAction === 'defend') {
            // Player prepares, and enemy defends (no damage dealt)
            enemyHealth -= 2;
            log += `Ты готовился, противник блокировал, но ты все равно нанес урон -2.<br>`;
            
        }
        // Both prepare, no damage taken
    }

    round++;
    updateStatus();

    if (playerHealth <= 0 || enemyHealth <= 0) {
        endGame();
    }
}

    function updateStatus() {
        document.getElementById('output').innerHTML = `Твоё здоровье: ${playerHealth} | Здоровье противника: ${enemyHealth}`;
        document.getElementById('log').innerHTML = log;
    }

    function endGame() {
    if (playerHealth <= 0) {
        // Перезапускаем страницу в случае поражения
        location.reload();
    } else {
        // Очищаем окно битвы и оставляем только кнопку "Продолжить" в случае победы
        const output = document.getElementById('output');
        output.innerHTML = 'Ты победил!';
        document.getElementById('actions').style.display = 'none';
        document.querySelector('button').style.display = 'none';
        document.querySelector('button[onclick="resetGame()"]').style.display = 'none';
        document.getElementById('continueButton').style.display = 'inline-block';
    }


}


    function resetGame() {
        playerHealth = 10;
        enemyHealth = 10;
        round = 1;
        log = "";
        updateStatus();
        document.getElementById('actions').style.display = 'flex';
        document.querySelector('button').style.display = 'none';
        document.getElementById('output').innerHTML = 'Битва началась!';
    }

    // Display actions after a short delay
    setTimeout(() => {
        document.getElementById('actions').style.display = 'flex';
    }, 1000);