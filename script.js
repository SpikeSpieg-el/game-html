// script.js

let clickCount = 0;
let clickValue = 1;
const UPGRADE_COUNT = 7;
let autoClick = 0;

const upgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 10, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 20, opened: false },
    { cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, autoClick: 1 } 
];

function saveGame() {
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

let autoClickerInterval;

function incrementClick() {
    clickCount += clickValue;
    if (clickCount < 0) {
        clickCount = 0; // Гарантируем, что клики не уходят в минус
    }
    document.getElementById("clickCount").innerText = clickCount;
    document.getElementById("clickValue").innerText = clickValue;
    document.getElementById("autoClick").innerText = autoClick;

    for (let i = 1; i <= UPGRADE_COUNT; i++) {
        const upgrade = upgrades[i - 1];
        const upgradeContainer = document.querySelector(`.hidden${i}`);
        const upgradeCostSpan = document.getElementById(`upgradeCost${i}`);

        if (clickCount >= upgrade.cost && !upgrade.opened) {
            upgradeContainer.style.display = "block";
            upgradeCostSpan.innerText = upgrade.cost;
            upgrade.opened = true;
        }
    }
    saveGame()
    checkUpgradeAvailability();
}

function checkUpgradeAvailability() {
    for (let upgradeIndex = 1; upgradeIndex <= UPGRADE_COUNT; upgradeIndex++) {
        const upgradeButton = document.getElementById(`upgrade${upgradeIndex}`);
        upgradeButton.disabled = upgrades[upgradeIndex - 1].cost > clickCount || !upgrades[upgradeIndex - 1].opened;

        if (upgradeIndex === UPGRADE_COUNT && !upgradeButton.disabled) {
            // Не запускаем автоклик автоматически; теперь это происходит только при явном нажатии на кнопку
        }
    }
    saveGame()
}

// Функция для покупки улучшения
function buyUpgrade(index) {
    const upgrade = upgrades[index - 1];
    if (clickCount >= upgrade.cost) {
        clickCount -= upgrade.cost;
        upgrade.level++;
        clickValue += upgrade.clickIncrease;
        upgrade.cost = upgrade.cost * upgrade.multiplier;

        if (clickCount < 0) {
            clickCount = 0; // Гарантируем, что клики не уходят в минус после покупки улучшения
        }

        document.getElementById("clickCount").innerText = clickCount;
        document.getElementById(`upgradeCost${index}`).innerText = upgrade.cost;

        if (index === UPGRADE_COUNT) {
            startAutoClicker(); // Запускаем автоклик при покупке последнего улучшения (кота)
        }

        checkUpgradeAvailability();
        saveGame();
    }
}

function startAutoClicker() {
    autoClickerInterval = setInterval(() => {
        clickCount -= upgrades[UPGRADE_COUNT - 1].autoClick;
        if (clickCount < 0) {
            clickCount = 0; // Гарантируем, что клики не уходят в минус при автоклике
        }
        document.getElementById("clickCount").innerText = clickCount;
    }, 1500 / upgrades[UPGRADE_COUNT - 1].autoClick);
    saveGame();
}


// Создаем функции для каждого улучшения
for (let i = 1; i <= UPGRADE_COUNT; i++) {
    window[`buyUpgrade${i}`] = () => buyUpgrade(i);
}
