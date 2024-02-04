// saveLoad.js
let savedUpgrades = [
     { cost: 20, level: 0, clickIncrease: 1, multiplier: 1.5, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 2.4, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 3.2, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 6.3, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 7, opened: false },
{ cost: 100, level: 0, clickIncrease: 0, multiplier: 1.1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 8, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
    { cost: 300, level: 0, clickIncrease: 1.5, multiplier: 1.3, opened: false, resourceIncrease: 1, image: "Pole.png"},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.4, opened: false, resourceIncrease_wood: 1, image: " forest_pilka.png"},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_stone: 1, image: "OIG.zBJ2V.png" },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 8, opened: false, home: 1, image: " dom1.png"}, 
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_metall: 1, image: "OIG.bFY9BU.jpeg" },
{ cost: 10000, level: 0, clickIncrease: 100, multiplier: 8.5, opened: false },
    { cost: 20000, level: 0, clickIncrease: 200, multiplier: 10, opened: false },
    { cost: 50000, level: 0, clickIncrease: 500, multiplier: 12, opened: false },
    { cost: 100000, level: 0, clickIncrease: 1000, multiplier: 15, opened: false },
    { cost: 200000, level: 0, clickIncrease: 2000, multiplier: 18, opened: false },
    { cost: 500000, level: 0, clickIncrease: 5000, multiplier: 22, opened: false },
    { cost: 1000000, level: 0, clickIncrease: 10000, multiplier: 23, opened: false },
{ cost: 1000, level: 0, clickIncrease: 0, multiplier: 1, opened: false},
    { cost: 1500, level: 0, clickIncrease: 0, multiplier: 1, opened: false},
    { cost: 2000, level: 0, clickIncrease: 0, multiplier: 1, opened: false}
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

    stoneTotalCount = parseInt(localStorage.getItem("stoneTotalCount")) || 0; 
    document.getElementById("stoneTotalCount").innerText = stoneTotalCount;

    hoseTotalCount = parseInt(localStorage.getItem("hoseTotalCount")) || 0; 
    document.getElementById("hoseTotalCount").innerText = hoseTotalCount;

    metallTotalCount = parseInt(localStorage.getItem("metallTotalCount")) || 0;
    document.getElementById("metallTotalCount").innerText = metallTotalCount;



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
                    imgElement.src = upgrades[index].image; // Исправлено: использовать свойство image из массива upgrades
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
    document.getElementById("stoneTotalCount").innerText = stoneTotalCount;
    document.getElementById("hoseTotalCount").innerText = hoseTotalCount;
    document.getElementById("clickCount").innerText = clickCount;
    document.getElementById("clickValue").innerText = clickValue;
    document.getElementById("catCount").innerText = catCount;
    document.getElementById("wheatTotalCount").innerText = wheatTotalCount;
    document.getElementById("metallTotalCount").innerText = metallTotalCount;


    checkUpgradeAvailability();
    
}


