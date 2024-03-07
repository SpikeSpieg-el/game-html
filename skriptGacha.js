// Коллекция карт
let collection = []; // измените const на let
let totalCardsCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    updateCollectionCounter();
});

function updateCollectionCounter() {
    const uniqueCardsCount = collection.length;
    const totalCardsCount = rewards.filter(reward => reward.type === "Карта").length;
    const counterElement = document.getElementById("collectionCounter");
    counterElement.textContent = `(${uniqueCardsCount} / ${totalCardsCount})`;
}

document.addEventListener("DOMContentLoaded", function() {
    loadCollectionData(); // Загружаем данные о коллекции
});

function loadCollectionData() {
    const savedCollection = localStorage.getItem("collection");
    if (savedCollection) {
        collection = JSON.parse(savedCollection); // уберите объявление const перед collection
        totalCardsCount = collection.reduce((total, card) => total + card.count, 0);
        updateCollectionDisplay();
        updateCollectionCounter();
    }
}
// Список возможных наград из сундука (карты и пустые награды)
const rewards = [
    { type: "empty" }, // Пустая награда
    { type: "empty" }, // Пустая награда
    { type: "empty" }, // Пустая награда
    { type: "empty" }, // Пустая награда
    { type: "empty" }, // Пустая награда
    { type: "Карта", rarity: "common", name: "Карта 1", image: "testCard/00023-3026824156.png" },
    { type: "Карта", rarity: "common", name: "Карта 2", image: "testCard/00025-4229486176.png" },
    { type: "Карта", rarity: "common", name: "Карта 3", image: "testCard/00026-1337542961.png" },
    { type: "Карта", rarity: "common", name: "Карта 4", image: "testCard/00027-3625868725.png" },
    { type: "Карта", rarity: "common", name: "Карта 5", image: "testCard/00028-2279620003.png" },
    { type: "Карта", rarity: "common", name: "Карта 6", image: "testCard/00029-3056698738.png" },
    { type: "Карта", rarity: "common", name: "Карта 7", image: "testCard/00031-44396804.png" },
    { type: "Карта", rarity: "common", name: "Карта 8", image: "testCard/00033-1623883453.png" },
    { type: "Карта", rarity: "common", name: "Карта 9", image: "testCard/00034-1896478820.png" },
    { type: "Карта", rarity: "common", name: "Карта 10", image: "testCard/00035-1474796013.png" },
    { type: "Карта", rarity: "common", name: "Карта 11", image: "testCard/00036-257346408.png" },
    { type: "Карта", rarity: "common", name: "Карта 12", image: "testCard/00037-989509602.png" },
    { type: "Карта", rarity: "common", name: "Карта 13", image: "testCard/00038-1734537472.png" },
    { type: "Карта", rarity: "common", name: "Карта 14", image: "testCard/00039-1085920090.png" },
    { type: "Карта", rarity: "legendary", name: "The Devil", image: "testCard/The Devil.png" },
    { type: "Карта", rarity: "legendary", name: "The Hanged Man", image: "testCard/The Hanged Man.png" },
    { type: "Карта", rarity: "legendary", name: "The Emperor", image: "testCard/The Emperor.png" },
    { type: "Карта", rarity: "legendary", name: "the empress", image: "testCard/the empress.png" },
    { type: "Карта", rarity: "epic", name: "the fool", image: "testCard/the fool.png" },
    { type: "Карта", rarity: "epic", name: "Death", image: "testCard/Death.png" },
    { type: "Карта", rarity: "epic", name: "The Hermit", image: "testCard/The Hermit.png" },
    { type: "Карта", rarity: "epic", name: "the hight priestess", image: "testCard/the hight priestess.png" },
    { type: "Карта", rarity: "rare", name: "The Lovers", image: "testCard/The Lovers.png" },
    { type: "Карта", rarity: "rare", name: "the magician", image: "testCard/the magician.png" },
    { type: "Карта", rarity: "rare", name: "The Wheel of Fortune", image: "testCard/The Wheel of Fortune.png" },
    { type: "Карта", rarity: "rare", name: "Temperance", image: "testCard/Temperance.png" },
    { type: "Карта", rarity: "legendary", name: "The Moon", image: "testCard/The Moon.png" },
    { type: "Карта", rarity: "legendary", name: "The Star", image: "testCard/The Star.png" },
    { type: "Карта", rarity: "legendary", name: "The Sun", image: "testCard/The Sun.png" },
    { type: "Карта", rarity: "legendary", name: "The World", image: "testCard/The World.png" },

    // Add other cards here with their respective rarities and images
];

        let currentFilter = "all";

        function applyFilter() {
    const filter = document.getElementById("filterDropdown").value;
    let filteredCollection = [];

    switch (filter) {
        case "ascending":
            filteredCollection = collection.slice().sort((a, b) => a.count - b.count);
            break;
        case "descending":
            filteredCollection = collection.slice().sort((a, b) => b.count - a.count);
            break;
        case "new":
            filteredCollection = collection.slice().sort((a, b) => b.dateAdded - a.dateAdded);
            break;
        case "old":
            filteredCollection = collection.slice().sort((a, b) => a.dateAdded - b.dateAdded);
            break;
        case "common":
        case "rare":
        case "epic":
        case "legendary":
            filteredCollection = collection.filter(card => card.rarity === filter);
            break;
        case "legendary-epic-rare-common":
            filteredCollection = collection.slice().sort((a, b) => {
                const rarityOrder = { "common": 0, "rare": 1, "epic": 2, "legendary": 3 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            });
            break;
        case "epic-rare-common":
            filteredCollection = collection.slice().sort((a, b) => {
                const rarityOrder = { "common": 0, "rare": 1, "epic": 2 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            });
            break;
        case "rare-common":
            filteredCollection = collection.slice().sort((a, b) => {
                const rarityOrder = { "common": 0, "rare": 1 };
                return rarityOrder[b.rarity] - rarityOrder[a.rarity];
            });
            break;
        default:
            filteredCollection = collection;
    }

    updateCollectionDisplay(filteredCollection);
}
        // Функция для выбивания случайных наград
function openChest() {
    currentFilter = document.getElementById("filterDropdown").value;
    const selectedRewards = [];
    let emptyRewardAdded = false; // Переменная для отслеживания добавления пустой награды

    for (let i = 0; i < 5; i++) {
        let randomIndex;

        // Гарантируем, что пустая награда будет добавлена минимум один раз
        if (!emptyRewardAdded && i === 4) { // Добавляем пустую награду в последней итерации цикла
            selectedRewards.push({ type: "empty" });
            emptyRewardAdded = true;
            continue;
        }

        randomIndex = Math.floor(Math.random() * 100); // Генерируем случайное число от 0 до 99

        // Если случайное число меньше или равно 4, добавляем пустую награду
        if (randomIndex <= 4 && !emptyRewardAdded) {
            selectedRewards.push({ type: "empty" });
            emptyRewardAdded = true;
            continue;
        }

     
        let selectedReward;
        if (randomIndex < 3) { // 3% шанс на легендарную награду
            selectedReward = getRandomRewardByRarity("legendary");
        } else if (randomIndex < 8) { // 5% шанс на эпическую награду
            selectedReward = getRandomRewardByRarity("epic");
        } else if (randomIndex < 18) { // 10% шанс на редкую награду
            selectedReward = getRandomRewardByRarity("rare");
        } else { // 82% шанс на обычную награду
            selectedReward = getRandomRewardByRarity("common");
        }
        selectedRewards.push(selectedReward);

        // Добавляем новые карты в коллекцию после каждой новой открытой
        if (selectedReward.type === "Карта") {
            addToCollection(selectedReward);
        }
    }

    showPopup(selectedRewards);
}



// Function to get a random reward by rarity
function getRandomRewardByRarity(rarity) {
    const filteredRewards = rewards.filter(reward => reward.type === "Карта" && reward.rarity === rarity);
    const randomIndex = Math.floor(Math.random() * filteredRewards.length);
    return filteredRewards[randomIndex];
}
// Функция для показа popup с наградами
function showPopup(rewards) {
    const popup = document.getElementById("rewardPopup");
    const rewardItemsContainer = document.getElementById("rewardItems");
    rewardItemsContainer.innerHTML = ""; // Очищаем контейнер

    rewards.forEach((reward, index) => {
        const rewardItem = document.createElement("div");
        rewardItem.classList.add("card");
        if (reward.type === "Карта") {
            const cardImage = document.createElement("img");
            cardImage.src = reward.image;
            cardImage.alt = reward.name;
            rewardItem.appendChild(cardImage);
            // Добавляем класс редкости карты
            rewardItem.classList.add(reward.rarity);
        } else if (reward.type === "empty") {
            const emptyImage = document.createElement("img");
            emptyImage.src = `testCard/empty${index}.png`; // Замените "path/to/empty" на путь к папке с изображениями для пустых наград
            emptyImage.alt = "Empty Reward";
            rewardItem.appendChild(emptyImage);
        } else {
            rewardItem.textContent = "Unknown Reward";
        }
        rewardItemsContainer.appendChild(rewardItem);
    });

    // Добавляем кнопку "Открыть ещё"
    const openMoreButton = document.createElement("button");
    openMoreButton.textContent = "Открыть ещё";
    openMoreButton.addEventListener("click", openChest);
    rewardItemsContainer.appendChild(openMoreButton);

    popup.style.display = "block"; // Отображаем popup
}


// Функция для забирания награды и закрытия popup
        function claimRewards() {
    const popup = document.getElementById("rewardPopup");
    const rewardItems = document.querySelectorAll("#rewardItems .card");

    rewardItems.forEach(rewardItem => {
        if (rewardItem.textContent !== "Пустая награда") {
            const cardImage = rewardItem.querySelector("img");
            const cardName = cardImage.alt;
            const cardImageSrc = cardImage.src;
            const cardRarity = rewardItem.classList[1]; // Получаем класс редкости карты
            const card = { type: "Карта", name: cardName, image: cardImageSrc, rarity: cardRarity }; // Передаем редкость карты
            
        }
    });

    applyFilter(); // Применяем текущий фильтр после добавления новых карт
    popup.style.display = "none"; // Закрываем popup
}
// Функция для добавления карты в коллекцию и отслеживания ее количества
function addToCollection(card) {
    const collectionElement = document.getElementById("collection");
    const existingCard = collection.find(c => c.name === card.name);

    if (existingCard) {
        existingCard.count++;
       
    } else {
        card.count = 1;
        card.strength = getStrengthByRarity(card.rarity); // Устанавливаем силу карты в зависимости от редкости
        totalCardsCount++;
        collection.push(card);
        const cardElement = createCardElement(card);
        collectionElement.appendChild(cardElement);
    }

    updateCollectionCounter();
    saveCollectionData(); // Сохраняем данные о коллекции
}

// Функция для получения силы карты в зависимости от ее редкости
function getStrengthByRarity(rarity) {
    switch (rarity) {
        case "common":
            return 1;
        case "rare":
            return 2;
        case "epic":
            return 3;
        case "legendary":
            return 4;
        default:
            return 1; // По умолчанию устанавливаем силу 1
    }
}

function saveCollectionData() {
    localStorage.setItem("collection", JSON.stringify(collection));
}
document.addEventListener("DOMContentLoaded", function() {
    loadCollectionData(); // Загружаем данные о коллекции
});

function loadCollectionData() {
    const savedCollection = localStorage.getItem("collection");
    if (savedCollection) {
        collection = JSON.parse(savedCollection);
        totalCardsCount = collection.reduce((total, card) => total + card.count, 0);
        updateCollectionDisplay();
        updateCollectionCounter();
    }
}
function clearCollection() {
    localStorage.removeItem("collection");
    collection = [];
    totalCardsCount = 0;
    updateCollectionDisplay();
    updateCollectionCounter();
}

function clearSavedData() {
    localStorage.clear();
    collection = [];
    totalCardsCount = 0;
    updateCollectionDisplay();
    updateCollectionCounter();
}

// Функция для обновления отображения коллекции
function updateCollectionDisplay(cards) {
    const collectionElement = document.getElementById("collection");
    collectionElement.innerHTML = ""; // Очищаем контейнер

    if (cards) {
        cards.forEach(card => {
            const cardElement = createCardElement(card);
            // Добавляем класс редкости к карте
            cardElement.classList.add(card.rarity);
            collectionElement.appendChild(cardElement);
        });
    } else {
        // Если аргумент не передан, отображаем все карты из коллекции
        collection.forEach(card => {
            const cardElement = createCardElement(card);
            // Добавляем класс редкости к карте
            cardElement.classList.add(card.rarity);
            collectionElement.appendChild(cardElement);
        });
    }
}
// Функция для создания HTML-элемента для карты в коллекции
function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    // Добавляем класс редкости к элементу в соответствии с редкостью карты
    if (card.rarity) {
        cardElement.classList.add(card.rarity);
    }

    const imageElement = document.createElement("img");
    imageElement.src = card.image;
    imageElement.alt = card.name;
    cardElement.appendChild(imageElement);

    const countElement = document.createElement("span");
    countElement.classList.add("count");
    countElement.textContent = `x${card.count}`;
    cardElement.appendChild(countElement);

    // Добавляем отображение силы карты
    const strengthElement = document.createElement("span");
    strengthElement.classList.add("strength");
    strengthElement.textContent = `Сила: ${card.strength}`;
    cardElement.appendChild(strengthElement);

    cardElement.addEventListener("click", () => showCardDetails(card));

    return cardElement;
}


// Функция для показа детальной информации о карте
function showCardDetails(card) {
    const cardDetailsPopup = document.getElementById("cardDetailsPopup");
    const cardDetailsContainer = document.getElementById("cardDetails");
    cardDetailsContainer.innerHTML = ""; // Очищаем контейнер

    const cardImage = document.createElement("img");
    cardImage.src = card.image;
    cardImage.alt = card.name;
    cardDetailsContainer.appendChild(cardImage);

    const cardName = document.createElement("p");
    cardName.textContent = `Название карты: ${card.name}`;
    cardDetailsContainer.appendChild(cardName);

    // Добавляем отображение силы карты
    const strengthElement = document.createElement("p");
    strengthElement.textContent = `Сила: ${card.strength}`;
    cardDetailsContainer.appendChild(strengthElement);

    // Добавляем кнопку прокачки карты с обработчиком события
    const upgradeButton = document.createElement("button");
    upgradeButton.textContent = "Прокачать карту";
    upgradeButton.onclick = function() {
        upgradeCard(card); // Вызываем функцию прокачки карты только при нажатии на кнопку
    };
    cardDetailsContainer.appendChild(upgradeButton);

    cardDetailsPopup.style.display = "block"; // Отображаем popup
    cardDetailsPopup.style.background = getBackgroundColorByRarity(card.rarity); // Устанавливаем фон в зависимости от редкости карты
}


// Функция для прокачки карты
function upgradeCard(card) {
    const upgradeCost = 10; // Количество копий карты для прокачки
    if (card.count >= upgradeCost) {
        // Уменьшаем количество копий карты
        card.count -= upgradeCost;
        // Увеличиваем силу карты
        card.strength++;
        // Обновляем счетчик коллекции
        updateCollectionCounter();
        // Обновляем отображение коллекции
        updateCollectionDisplay();
        // Сохраняем данные о коллекции
        saveCollectionData();
        // Закрываем pop-up с детальной информацией о карте
        closeCardDetails();
    } else {
        alert("Недостаточно копий карты для прокачки.");
    }
}



        // Функция для закрытия pop-up с детальной информацией о карте
        function closeCardDetails() {
            const cardDetailsPopup = document.getElementById("cardDetailsPopup");
            cardDetailsPopup.style.display = "none"; // Закрываем pop-up
        }
        function getBackgroundColorByRarity(rarity) {
    switch (rarity) {
        case "common":
            return "#626262"; // Цвет фона для обычных карт
        case "rare":
            return "#9C8922"; // Цвет фона для редких карт
        case "epic":
            return "#723093"; // Цвет фона для эпических карт
        case "legendary":
            return "#B94E27"; // Цвет фона для легендарных карт
        default:
            return "#290303"; // Цвет фона по умолчанию
    }
}
