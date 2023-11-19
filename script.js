// script.js

let clickCount = 0;
let clickValue = 1;
const UPGRADE_COUNT = 10;
let catCount = 20;

let wheatCount = 0;  
let wheatTotalCount = 0; //количества пшена

let woodCount = 0; 
let woodTotalCount = 0; //количества деревьев

let isAnimating = false;


//1{ cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
//2{ cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
//3{ cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
//4{ cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
//5{ cost: 3000, level: 0, clickIncrease: 20, multiplier: 10, opened: false },
//6{ cost: 5000, level: 0, clickIncrease: 50, multiplier: 20, opened: false },
//7{ cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, catCountIncrease: 1 },
//8 амбар { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
//9 пшено{ cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, image: "Pole.png"}
//10 лесопилка{ cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, resourceIncrease_wood: 1, image: " forest_pilka.png"}

const upgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 7, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 9, opened: false },
    { cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 2, opened: false, resourceIncrease: 1, image: "Pole.png"},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false, resourceIncrease_wood: 1, image: " forest_pilka.png"}

    
];

// Функция для покупки улучшения
function buyUpgrade(index) {
    const upgrade = upgrades[index - 1];
    if (clickCount >= upgrade.cost) {
        clickCount -= upgrade.cost;
        upgrade.level++;
        clickValue += upgrade.clickIncrease;
        upgrade.cost = upgrade.cost * upgrade.multiplier;

        // Check if the upgrade affects catCount
        if (upgrade.catCountIncrease) {
            catCount += upgrade.catCountIncrease;
        }
        // Check if the upgrade affects wheatCount
        if (upgrade.resourceIncrease) {
            wheatTotalCount += upgrade.resourceIncrease;

            // Обновление значения на странице
            document.getElementById("wheatTotalCount").innerText = wheatTotalCount;
        }

        // Check if the upgrade affects woodCount
        if (upgrade.resourceIncrease_wood) {
            woodTotalCount += upgrade.resourceIncrease_wood;

            // Обновление значения на странице
            document.getElementById("woodTotalCount").innerText = woodTotalCount;
        }

        if (clickCount < 0) {
            clickCount = 0;
        }

        document.getElementById("clickCount").innerText = clickCount;
        document.getElementById("catCount").innerText = catCount; // Update catCount

        document.getElementById(`upgradeCost${index}`).innerText = upgrade.cost;

        // Check if the upgrade has an image property
        if (upgrade.image) {
            const upgradeContainer = document.getElementById(`hiddenimg${index}`);
            if (upgradeContainer) {
                const imgElement = document.createElement('img');
                imgElement.src = upgrade.image;
                imgElement.alt = 'img';
                imgElement.classList.add('img-sity');
                upgradeContainer.appendChild(imgElement);
            } else {
                console.error(`Container with id 'hiddenimg${index}' not found.`);
            }
        }

        checkUpgradeAvailability();
        saveGame();

        // Show notification when an upgrade is opened
        showNotification('info', `Upgrade ${index} opened!`);
    }
}



function saveGame() {
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("catCount", catCount);
    localStorage.setItem("woodTotalCount", woodTotalCount); // Добавьте сохранение общего количества дерева
    localStorage.setItem("wheatTotalCount", wheatTotalCount); // Добавьте сохранение общего количества пшена
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
}



function incrementClick() {
    clickCount += clickValue;

    // Убедитесь, что clickCount не станет отрицательным
    if (clickCount < 0) {
        clickCount = 0;
    }

    // Проверка наличия объекта для ресурса "пшено"
    if (upgrades[UPGRADE_COUNT]) {
        wheatCount += upgrades[UPGRADE_COUNT].level * upgrades[UPGRADE_COUNT].resourceIncrease;
        wheatTotalCount += upgrades[UPGRADE_COUNT].resourceIncrease;
        // Обновление значения на странице
        document.getElementById("wheatTotalCount").innerText = wheatTotalCount;
    }
    if (upgrades[UPGRADE_COUNT + 1]) {
        woodCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_wood;
        woodTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_wood;
        // Обновление значения на странице
        document.getElementById("woodTotalCount").innerText = woodTotalCount;
    }
    // анимация
    updateAnimatedNumber();

    document.getElementById("clickCount").innerText = clickCount;
    document.getElementById("clickValue").innerText = clickValue;

    for (let i = 1; i <= UPGRADE_COUNT; i++) {
        const upgrade = upgrades[i - 1];
        const upgradeContainer = document.querySelector(`.hidden${i}`);
        const upgradeCostSpan = document.getElementById(`upgradeCost${i}`);

        if (clickCount >= upgrade.cost && !upgrade.opened) {
            upgradeContainer.style.display = "block";
            upgradeCostSpan.innerText = upgrade.cost;
            upgrade.opened = true;

            // Show notification when the upgrade is opened
            showNotification('success', `Upgrade ${i} is now available!`);
        }
    }

    saveGame();
    checkUpgradeAvailability();
}

    
//Анимация +1 клик с анимацией
let lastClickTime = 0;

function updateAnimatedNumber() {
    if (isAnimating) {
        return;
    }

    isAnimating = true;

    const currentTime = performance.now();
    const timeSinceLastClick = currentTime - lastClickTime;
    lastClickTime = currentTime;

    const animatedNumberContainer = document.querySelector('.animated-number-container');
    const animatedNumber = document.getElementById('animatedNumber');
    animatedNumber.textContent = `+${clickValue}`;

    // Trigger animation
    animatedNumber.style.opacity = 1;
    animatedNumber.style.transform = 'scale(2)'; // Scale the number for a more pronounced effect

    // Position the animated number container above the button
    animatedNumberContainer.style.display = 'flex';
    animatedNumberContainer.style.alignItems = 'center';
    animatedNumberContainer.style.justifyContent = 'center';

    let start;
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;

        // Calculate the position of the animated number
        const translateY = -progress / (1 + timeSinceLastClick / 100); // Adjust the division factor to control the speed
        const scale = 2 - progress / 700; // You can adjust the division factor to control the scaling

        animatedNumber.style.transform = `translateY(${translateY}px) scale(${scale})`;

        if (progress < 230) {
            requestAnimationFrame(step);
        } else {
            resetAnimation();
        }
    }

    requestAnimationFrame(step);

    function resetAnimation() {
        animatedNumber.style.opacity = 0;
        animatedNumber.style.transform = 'scale(2)';
        isAnimating = false;
    }
}

function checkUpgradeAvailability() {
    for (let upgradeIndex = 1; upgradeIndex <= UPGRADE_COUNT; upgradeIndex++) {
        const upgradeButton = document.getElementById(`upgrade${upgradeIndex}`);
        upgradeButton.disabled = upgrades[upgradeIndex - 1].cost > clickCount || !upgrades[upgradeIndex - 1].opened;
    }

    saveGame();
}

// Создаем функции для каждого улучшения
for (let i = 1; i <= UPGRADE_COUNT; i++) {
    window[`buyUpgrade${i}`] = () => buyUpgrade(i);
}

//уведомления 
document.addEventListener('DOMContentLoaded', function () {
    const saveButton = document.querySelector('.top button:nth-child(1)');
    const loadButton = document.querySelector('.top button:nth-child(2)');

    saveButton.addEventListener('click', function () {
        showSaveNotification();
        saveGame();
    });

    loadButton.addEventListener('click', function () {
        showLoadNotification();
        loadGame();
    });

});

const notificationColors = {
    success: 'green',
    info: 'blue',
    warning: 'orange',
    error: 'red',
    custom: 'purple',
};

let activeNotifications = [];
let notificationHeight = 70; // Adjust this value based on your notification height

function showNotification(type, text) {
    const notification = createNotification(type, text);

    // Set the position to stack notifications vertically
    const offset = activeNotifications.length * notificationHeight;
    notification.style.bottom = offset + 'px' ;
    


    // Display the notification initially with slideDown animation
    notification.classList.add('slideDown');
    notification.style.display = 'block';

    document.getElementById('notifications-container').appendChild(notification);

    activeNotifications.push(notification);

    setTimeout(() => {
        closeNotification(notification);
    }, 3000);
}

function showSaveNotification() {
    showNotification('success', 'Game saved successfully!');
    saveGame();
}

function showLoadNotification() {
    showNotification('info', 'Game loaded successfully!');
}



function createNotification(type, text) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = text;
    notification.style.backgroundColor = notificationColors[type]; // Set consistent color
    return notification;
}

function closeNotification(notification) {
    notification.classList.add('fadeOut');
    setTimeout(() => {
        notification.style.display = 'none';
        activeNotifications = activeNotifications.filter(item => item !== notification);

        // Adjust positions of remaining notifications
        activeNotifications.forEach((activeNotification, index) => {
            activeNotification.style.bottom = index * notificationHeight + 'px';
        });
    }, 300); // Adjust the time to match the fadeOut animation duration
}
