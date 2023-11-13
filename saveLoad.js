// saveLoad.js
let savedUpgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 10, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 20, opened: false },
    { cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, autoClick: 1 }
];

function loadGame() {
    clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
    clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
    const savedUpgrades = JSON.parse(localStorage.getItem("upgrades")) || upgrades;

    // Обновляем данные об улучшениях
    for (let index = 0; index < UPGRADE_COUNT; index++) {
        upgrades[index].level = savedUpgrades[index].level;
        upgrades[index].cost = savedUpgrades[index].cost;
        upgrades[index].opened = savedUpgrades[index].opened;

        // Отображаем или скрываем кнопку в соответствии с сохраненным статусом открытия
        const upgradeContainer = document.querySelector(`.hidden${index + 1}`);
        const upgradeCostSpan = document.getElementById(`upgradeCost${index + 1}`);

        if (upgrades[index].opened) {
            upgradeContainer.style.display = "block";
        } else {
            upgradeContainer.style.display = "none";
        }

        upgradeCostSpan.innerText = upgrades[index].cost; // Обновляем стоимость улучшения в DOM
    }

    document.getElementById("clickCount").innerText = clickCount;
    document.getElementById("clickValue").innerText = clickValue;
    checkUpgradeAvailability(); // Обновляем доступность улучшений при загрузке
}
