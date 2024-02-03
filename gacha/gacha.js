let containerCount = 0;
let openedContainers = 0;
let itemsPerContainer = 10;
let baseEliteChance = 0.001;
let eliteChanceIncrement = 0.001;
let eliteChance = baseEliteChance;

let containerCount1 = 0;
let openedContainers1 = 0;
let containerCount2 = 0;
let openedContainers2 = 0;
let containerCount3 = 0;
let openedContainers3 = 0;

function openContainer(itemsPerContainer) {
    // Hide all container and result elements initially
    hideAllContainers();

    let containerCount, openedContainers, containerInfoElement, resultElement;

    if (itemsPerContainer === 3) {
        containerCount = ++containerCount1;
        openedContainers = ++openedContainers1;
        containerInfoElement = document.getElementById("containerInfo");
        resultElement = document.getElementById("result");
    } else if (itemsPerContainer === 5) {
        containerCount = ++containerCount2;
        openedContainers = ++openedContainers2;
        containerInfoElement = document.getElementById("containerInfo2");
        resultElement = document.getElementById("result2");
    } else if (itemsPerContainer === 10) {
        containerCount = ++containerCount3;
        openedContainers = ++openedContainers3;
        containerInfoElement = document.getElementById("containerInfo3");
        resultElement = document.getElementById("result3");
    } else {
        console.error("Invalid itemsPerContainer value");
        return;
    }

    // Show the selected container and result elements
    containerInfoElement.style.display = "block";
    resultElement.style.display = "flex";

    let containerInfo = "Открыт контейнер " + containerCount;
    containerInfoElement.innerHTML = containerInfo;

    let containerContent = [];
    let itemsInColumn = itemsPerContainer / 2;

    for (let i = 0; i < itemsPerContainer; i++) {
        let rarity = calculateRarity();
        let isElite = Math.random() < eliteChance;
        let itemClass = getItemClass(rarity, isElite);
    if (i >= itemsInColumn) {
            itemClass += " right-column";
        }

        containerContent.push(`<div class="item ${itemClass}">${getItemImage(rarity)} ${rarity}</div> `);

        if (i === itemsInColumn - 1) {
            containerContent.push('<br>');
        }

        if (isElite) {
            eliteChance = baseEliteChance;
        }
    }

    resultElement.innerHTML = containerContent.join('');

    setTimeout(() => {
        document.querySelectorAll('.item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    }, 500);
}

function hideAllContainers() {
    document.querySelectorAll('.container-info, .result-container').forEach((element) => {
        element.style.display = "none";
    });
}

function calculateRarity() {
    let rand = Math.random();
    let rarity;

    if (rand < baseEliteChance) {
        rarity = "Элитный";
    } else if (rand < 0.005) {
        rarity = "Легендарный";
    } else if (rand < 0.03) {
        rarity = "Эпический";
    } else if (rand < 0.037) {
        rarity = "Золотой";
    } else if (rand < 0.07) {
        rarity = "Серебрянный";
    } else if (rand < baseEliteChance + 0.47) {
        rarity = rand < baseEliteChance + 0.4 ? "Ресурс 1" : "Ресурс 2";
    } else {
        rarity = "Обычный";
    }

    console.log("Calculated Rarity: ", rarity);
    return rarity;
}


function getItemClass(rarity, isElite) {
    if (isElite) {
        return "elite";
    } else {
        switch (rarity) {
            case "Легендарный":
                return "legendary";
            case "Эпический":
                return "epic";
            case "Золотой":
                return "golden";
            case "Серебрянный":
                return "silver";
            case "Элитный":
                return "elite";
            case "Ресурс 1":
                return "st1";
            case "Ресурс 2":
                return "st2";
            default:
                return "common";
        }
    }
}

function getItemImage(rarity) {
    switch (rarity) {
        case "Легендарный":
            return '<img src="12802fb0a815.jpg" alt="Legendary">';
        case "Эпический":
            return '<img src="574ee342e6b1.jpg" alt="Epic">';
        case "Золотой":
            return '<img src="9b8e093aa9bc.jpg" alt="Golden">';
        case "Серебрянный":
            return '<img src="f361537f27e1.jpg" alt="Silver">';
        case "Элитный":
            return '<img src="2964ff176157.jpg" alt="Elite">';

            case "Ресурс 1":
                    return '<img src="Tree.png" alt="st1">';
            case "Ресурс 2":
                    return '<img src="Wood.png" alt="st2">';
        default:
            return '<img src="223ad0522821.jpg" alt="Common">';
    
    }
}

