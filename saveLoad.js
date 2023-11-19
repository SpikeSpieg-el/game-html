// saveLoad.js

//1{ cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
//2{ cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
//3{ cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
//4{ cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
//5{ cost: 3000, level: 0, clickIncrease: 20, multiplier: 10, opened: false },
//6{ cost: 5000, level: 0, clickIncrease: 50, multiplier: 20, opened: false },
//7{ cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, catCountIncrease: 1 },
//8 амбар { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
//9 пшено { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, image: "Pole.png"}

// Объявляем savedUpgrades как глобальную переменную (если это необходимо)
// saveLoad.js

// Объявляем savedUpgrades как глобальную переменную (если это необходимо)
let savedUpgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 7, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 9, opened: false },
    { cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, image: "OIG.3NJJoFBIJGj4Z.png" },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, resourceIncrease: 1, image: "Pole.png" },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, resourceIncrease_wood: 1, image: "forest_pilka.png" }
];

function loadGame() {
    clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
    clickValue = parseInt(localStorage.getItem("clickValue")) || 1;
    catCount = parseInt(localStorage.getItem("catCount")) || 0;

    wheatTotalCount = parseInt(localStorage.getItem("wheatTotalCount")) || 0; // Загрузка общего количества пшена
    document.getElementById("wheatTotalCount").innerText = wheatTotalCount;

    // Загружаем количество дерева
    woodTotalCount = parseInt(localStorage.getItem("woodTotalCount")) || 0;
    document.getElementById("woodTotalCount").innerText = woodTotalCount;

    const savedUpgradesJSON = localStorage.getItem("upgrades");
    savedUpgrades = savedUpgradesJSON ? JSON.parse(savedUpgradesJSON) : savedUpgrades;

    for (let index = 0; index < UPGRADE_COUNT; index++) {
        upgrades[index].level = savedUpgrades[index].level;
        upgrades[index].cost = savedUpgrades[index].cost;
        upgrades[index].opened = savedUpgrades[index].opened;

        const upgradeContainer = document.querySelector(`.hidden${index + 1}`);
        const upgradeCostSpan = document.getElementById(`upgradeCost${index + 1}`);

        if (upgrades[index].opened) {
            upgradeContainer.style.display = "block";

            // Добавляем изображение в контейнер, если оно было открыто
            const upgradeImageContainer = document.getElementById(`hiddenimg${index + 1}`);

            // Проверяем, что upgradeImageContainer существует
            if (upgradeImageContainer) {
                // Очищаем контейнер перед добавлением новых изображений
                upgradeImageContainer.innerHTML = "";

                for (let i = 0; i < upgrades[index].level; i++) {
                    const imgElement = document.createElement('img');
                    imgElement.src = upgrades[index].image;
                    imgElement.alt = 'acat';
                    imgElement.classList.add('img-sity');
                    upgradeImageContainer.appendChild(imgElement);
                }
            } else {
                console.error(`Container with id 'hiddenimg${index + 1}' not found.`);
            }
        } else {
            upgradeContainer.style.display = "none";
        }

        upgradeCostSpan.innerText = upgrades[index].cost;
    }

    document.getElementById("woodTotalCount").innerText = woodTotalCount;

    document.getElementById("clickCount").innerText = clickCount;
    document.getElementById("clickValue").innerText = clickValue;
    document.getElementById("catCount").innerText = catCount;

    checkUpgradeAvailability();
}
