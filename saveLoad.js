// saveLoad.js
let savedUpgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 1.5, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 2.4, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 3.2, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 5.25, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 6.10, opened: false },
{ cost: 100, level: 0, clickIncrease: 0, multiplier: 1.1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 8, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
    { cost: 100, level: 0, clickIncrease: 1.5, multiplier: 1.1, opened: false, resourceIncrease: 1, image: "Pole.png"},
    { cost: 200, level: 0, clickIncrease: 0, multiplier: 1.4, opened: false, resourceIncrease_wood: 1, image: " forest_pilka.png"},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_stone: 1, image: "OIG.zBJ2V.png" },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 5.25, opened: false, home: 1, image: " dom1.png"}, 
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_metall: 1, image: "OIG.bFY9BU.jpeg" },
{ cost: 10000, level: 0, clickIncrease: 100, multiplier: 8.5, opened: false },
    { cost: 20000, level: 0, clickIncrease: 200, multiplier: 10, opened: false },
    { cost: 50000, level: 0, clickIncrease: 500, multiplier: 10.15, opened: false },
    { cost: 100000, level: 0, clickIncrease: 1000, multiplier: 10.26, opened: false },
    { cost: 200000, level: 0, clickIncrease: 2000, multiplier: 10.45, opened: false },
    { cost: 500000, level: 0, clickIncrease: 5000, multiplier: 10.6, opened: false },
    { cost: 1000000, level: 0, clickIncrease: 10000, multiplier: 10.85, opened: false },
{ cost: 1000, level: 0, clickIncrease: 0, multiplier: 1.25, opened: false},
    { cost: 1110, level: 0, clickIncrease: 0, multiplier: 1.35, opened: false},
    { cost: 2000, level: 0, clickIncrease: 0, multiplier: 1.45, opened: false},
    { cost: 5000000, level: 0, clickIncrease: 100000, multiplier: 11, opened: false }
];



function loadGame() {
    // Загрузка всех значений из localStorage

    numberFormat = localStorage.getItem("numberFormat") || 'decimal';

    clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
    clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
    catCount = parseInt(localStorage.getItem("catCount")) || 0;
    wheatTotalCount = parseInt(localStorage.getItem("wheatTotalCount")) || 0;
    woodTotalCount = parseInt(localStorage.getItem("woodTotalCount")) || 0;
    stoneTotalCount = parseInt(localStorage.getItem("stoneTotalCount")) || 0;
    hoseTotalCount = parseInt(localStorage.getItem("hoseTotalCount")) || 0;
    metallTotalCount = parseInt(localStorage.getItem("metallTotalCount")) || 0;
    goldCount = parseInt(localStorage.getItem("goldCount")) || 0;

    const savedUpgradesJSON = localStorage.getItem("upgrades");
    savedUpgrades = savedUpgradesJSON ? JSON.parse(savedUpgradesJSON) : savedUpgrades;

    // Обновление HTML элементов согласно загруженным значениям
    document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
    document.getElementById("clickValue").innerText = formatNumber(roundCost(clickValue));
    document.getElementById("catCount").innerText = formatNumber(roundCost(catCount));
    document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
    document.getElementById("woodTotalCount").innerText = formatNumber(roundCost(woodTotalCount));
    document.getElementById("stoneTotalCount").innerText = formatNumber(roundCost(stoneTotalCount));
    document.getElementById("hoseTotalCount").innerText = formatNumber(roundCost(hoseTotalCount));
    document.getElementById("metallTotalCount").innerText = formatNumber(roundCost(metallTotalCount));
    document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));

document.addEventListener("DOMContentLoaded", function() {
    loadCollectionData(); // Загружаем данные о коллекции
});
const savedCollection = localStorage.getItem("collection");
    if (savedCollection) {
        collection = JSON.parse(savedCollection);
        totalCardsCount = collection.reduce((total, card) => total + card.count, 0);
        updateCollectionDisplay();
        updateCollectionCounter();
    }


    // Обновление доступности апгрейдов
    for (let index = 0; index < UPGRADE_COUNT; index++) {
        upgrades[index].level = savedUpgrades[index].level;
        upgrades[index].cost = savedUpgrades[index].cost;
        upgrades[index].opened = savedUpgrades[index].opened;

        const upgradeContainer = document.querySelector(`.hidden${index + 1}`);
        const upgradeCostSpan = document.getElementById(`upgradeCost${index + 1}`);

        if (upgrades[index].opened) {
            upgradeContainer.style.display = "block";

            const upgradeImageContainer = document.getElementById(`hiddenimg${index + 1}`);
            if (upgradeImageContainer) {
                upgradeImageContainer.innerHTML = "";

                for (let i = 0; i < upgrades[index].level; i++) {
                    const imgElement = document.createElement('img');
                    imgElement.src = upgrades[index].image;
                    imgElement.alt = 'acat';
                    imgElement.classList.add('img-sity');
                    upgradeImageContainer.appendChild(imgElement);
                }
            }
        } else {
            upgradeContainer.style.display = "none";
        }

        upgradeCostSpan.innerText = formatNumber(roundCost(upgrades[index].cost));
    }

    // Обновление доступности апгрейдов
    checkUpgradeAvailability();
    updateAllUpgradeProgress();
}


