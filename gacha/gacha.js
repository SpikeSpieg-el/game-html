let containerCount = 0;
let itemsPerContainer = 10;
let baseEliteChance = 0.001;
let eliteChanceIncrement = 0.001;
let chanceDisplayElement = document.getElementById("currentChance");


let eliteChance = baseEliteChance;
let openedContainers = 0;

function openContainer() {
    containerCount++;
    openedContainers++;

    let resultElement = document.getElementById("result");
    let result = "Открыт контейнер " + containerCount + ": ";
    let containerContent = [];

    for (let i = 0; i < itemsPerContainer; i++) {
        // Вычисление редкости предмета
        let rarity = calculateRarity();

        // Определение, выпал ли элитный предмет
        let isElite = Math.random() < eliteChance;

        // Добавление предмета в контейнер
        containerContent.push(`<div class="item ${getItemClass(rarity, isElite)}">${getItemImage(rarity)} ${rarity}</div> `);

        // Сброс шанса при выпадении элитного предмета
        if (isElite) {
            eliteChance = baseEliteChance;
        }
    }

    resultElement.innerHTML = result + containerContent.join('');
}

function calculateRarity() {
    let rand = Math.random();
    
    if (rand < baseEliteChance) {
        return "Элитный";
    } else if (rand <  0.005) {
        return "Легендарный";
    } else if (rand <  0.03) {
        return "Эпический";
    } else if (rand <  0.037) {
        return "Золотой";
    } else if (rand <  0.07) {
        return "Серебрянный";
    } else if (rand < baseEliteChance + 0.47) {
        return rand < baseEliteChance + 0.4 ? "Ресурс 1" : "Ресурс 2";
    } else {
        return "Обычный";
    }
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
            return '<img src="_2dc644b0-3e3c-4d06-827f-12802fb0a815.jpg" alt="Legendary">';
        case "Эпический":
            return '<img src="_4ebc6f96-dfb3-4b66-8d96-574ee342e6b1.jpg" alt="Epic">';
        case "Золотой":
            return '<img src="_efc0be59-33a4-4ee6-9bb0-9b8e093aa9bc.jpg" alt="Golden">';
        case "Серебрянный":
            return '<img src="_da98b2d3-d85d-476d-b61e-f361537f27e1.jpg" alt="Silver">';
        case "Элитный":
            return '<img src="_d87442b6-a0cf-4182-867f-2964ff176157.jpg" alt="Elite">';

            case "Ресурс 1":
                    return '<img src="k-eke-artist-Chainsawman-Chainsaw-Man-6769864.gif" alt="st1">';
            case "Ресурс 2":
                    return '<img src="Chainsaw-Man-Manga-Anime-makima-(chainsaw-man)-6697352.gif" alt="st2">';
        default:
            return '<img src="_f1200d8f-3b98-4e93-8890-223ad0522821.jpg" alt="Common">';
    
    }
}
