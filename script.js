// script.js

let clickCount = 0;
let clickValue = 1;
const UPGRADE_COUNT = 9;
let catCount = 0;


let isAnimating = false;

const upgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 2, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 3, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 4, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 10, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 20, opened: false },
    { cost: 100, level: 0, clickIncrease: 0, multiplier: 1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false,},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1, opened: false,}
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

        if (clickCount < 0) {
            clickCount = 0;
        }

        document.getElementById("clickCount").innerText = clickCount;
        document.getElementById("catCount").innerText = catCount; // Update catCount

        document.getElementById(`upgradeCost${index}`).innerText = upgrade.cost;

        if (index === UPGRADE_COUNT) {
            startAutoClicker();
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
    localStorage.setItem("upgrades", JSON.stringify(upgrades));
}



function incrementClick() {
    clickCount += clickValue;
    if (clickCount < 0) {
        clickCount = 0;
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
function updateAnimatedNumber() {
    if (isAnimating) {
        return;
    }

    isAnimating = true;

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
        animatedNumber.style.opacity = 1 - progress / 1000;
        animatedNumber.style.transform = `scale(${2 - progress / 500})`;

        if (progress < 350) {
            requestAnimationFrame(step);
        } else {
            resetAnimation();
        }
    }

    requestAnimationFrame(step);

    function resetAnimation() {
        animatedNumber.style.opacity = 0;
        animatedNumber.style.transform = 'scale(1)';
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

        if (clickCount < 0) {
            clickCount = 0;
        }

        document.getElementById("clickCount").innerText = clickCount;
        document.getElementById("catCount").innerText = catCount; // Update catCount

        const upgradeContainer = document.querySelector(`.hidden${index}`);
        const upgradeCostSpan = document.getElementById(`upgradeCost${index}`);

        // Check if the upgrade is not already opened
        if (!upgrade.opened) {
            upgradeContainer.style.display = "block";
            upgradeCostSpan.innerText = upgrade.cost;
            upgrade.opened = true;

            // Show notification when the upgrade is opened
            showNotification('success', `Upgrade ${index} is now available!`);
        }

        document.getElementById(`upgradeCost${index}`).innerText = upgrade.cost;

        checkUpgradeAvailability();
        saveGame();
    }
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
let notificationHeight = 60; // Adjust this value based on your notification height

function showNotification(type, text) {
    const notification = createNotification(type, text);

    // Set the position to stack notifications vertically
    const offset = activeNotifications.length * notificationHeight;
    notification.style.bottom = offset + 'px';

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
