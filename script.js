const upgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 1.5, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 2.4, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 3.2, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 6.3, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 7, opened: false },
{ cost: 100, level: 0, clickIncrease: 0, multiplier: 1.1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 8, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
    { cost: 100, level: 0, clickIncrease: 1.5, multiplier: 1.3, opened: false, resourceIncrease: 1, image: "Pole.png"},
    { cost: 200, level: 0, clickIncrease: 0, multiplier: 1.4, opened: false, resourceIncrease_wood: 1, image: " forest_pilka.png"},
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
    { cost: 1110, level: 0, clickIncrease: 0, multiplier: 1, opened: false},
    { cost: 2000, level: 0, clickIncrease: 0, multiplier: 1, opened: false},
    { cost: 5000000, level: 0, clickIncrease: 0, multiplier: 26, opened: false }
];//1{ cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_stone: 1, image: "OIG.zBJ2V.png" }

let clickCount = 0; // сколько сейчас
let clickValue = 1; //сколько за клик
const UPGRADE_COUNT = 23; //сколько всего улутшений
let catCount = 5; //сколько котов в поселении

let wheatCount = 0;  
let wheatTotalCount = 0; //количества пшена

let woodCount = 0; 
let woodTotalCount = 0; //количества деревьев

let stoneCount = 0;
let stoneTotalCount = 0; //количества камня

let hoseCount = 0;
let hoseTotalCount= 0; //домики 

let metallCount =0;
let metallTotalCount=0; //metall 

let goldCount = 10; //золото


let isAnimating = false;
let upgradeMarkers = Array(UPGRADE_COUNT).fill(false);








    
let numberFormat = localStorage.getItem("numberFormat") || 'decimal';
function roundCost(cost) {
    return Math.round(cost * 10) / 10;
}

function formatNumber(number, notation) {
    return number.toLocaleString('en-US', { notation: notation });
}

//2if (index === 11) {
        //wheatTotalCount -= 10;
        //woodTotalCount -=5;
        //document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
        //document.getElementById("woodTotalCount").innerText = woodTotalCount;

function buyUpgrade(index) {
    const upgrade = upgrades[index - 1];
   

    if (clickCount >= upgrade.cost) {
        clickCount -= upgrade.cost;
        upgrade.level++;
        clickValue += upgrade.clickIncrease;
        upgrade.cost = upgrade.cost * upgrade.multiplier;
    

    // Check if the upgrade affects catCount
      

        // Check if the upgrade affects wheatCount
        
        if (upgrade.resourceIncrease) {
            if (upgrade.level > 5) {
                wheatTotalCount = upgrade.level;
            } else {
                
                wheatTotalCount += upgrade.resourceIncrease;
                updateWheatText();
            } 
            // Обновление значения на странице
            document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
              
        }
       // Call a function to update the wheat text
            function updateWheatText() {
                const wheatTextElement = document.getElementById('wheatText');
            
                if (wheatTextElement) {
                    // Update the text content based on the condition
                    wheatTextElement.textContent = wheatTotalCount >= 5 ? 'Собрать урожай! Пшено:' : 'Пшено';
                }
        
        
        }

        // Check if the upgrade affects woodCount
        if (upgrade.resourceIncrease_wood) {
        woodTotalCount += upgrade.resourceIncrease_wood;
        if (upgrade.level > 2) {
            woodTotalCount += upgrade.level;
        } else {
            woodTotalCount += upgrade.resourceIncrease_wood;
        }

        // Обновление значения на странице
        document.getElementById("woodTotalCount").innerText = formatNumber(roundCost(woodTotalCount));
        }
        if (upgrade.resourceIncrease_stone) {
        stoneTotalCount += upgrade.resourceIncrease_stone;

        // Обновление значения на странице
        document.getElementById("stoneTotalCount").innerText = formatNumber(roundCost(stoneTotalCount));
        }
        if (upgrade.resourceIncrease_metall) {
        metallTotalCount += upgrade.resourceIncrease_metall;

        // Обновление значения на странице
        document.getElementById("metallTotalCount").innerText = formatNumber(roundCost(metallTotalCount));
        }
        if (upgrade.home) {
            hoseTotalCount += upgrade.home;
            // Add 1 gold for each house built
            goldCount += upgrade.home;
    
            // Update the displayed gold count on the page
            document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));
        
        // Обновление значения на странице
        document.getElementById("hoseTotalCount").innerText = formatNumber(roundCost(hoseTotalCount));
        }
        if (index === 7 && hoseTotalCount >= 3+1) {
            catCount += upgrade.catCountIncrease;
            wheatTotalCount -= 5;
            document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
            }

        // Уменьшаем пшено только для лесопилки 
        if (index === 10) {
        wheatTotalCount -= 10;
        document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
        }
        if (index === 21) {
            goldCount -=1;
            document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));

        }
        if (index === 22) {
            goldCount -=2;
            document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));

        }
        if (index === 23) {
            goldCount -=3;
            document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));

        }

        if (index === 11) {
        wheatTotalCount -= 10;
        woodTotalCount -=5;
        document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
        document.getElementById("woodTotalCount").innerText = woodTotalCount;
        }

        if (index === 13) {
        wheatTotalCount -= 20;
        woodTotalCount -=15;
        stoneTotalCount -=5;
        clickValue = clickValue *1.2;
        document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
        document.getElementById("woodTotalCount").innerText = woodTotalCount; 
        document.getElementById("stoneTotalCount").innerText = stoneTotalCount;
        document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
        }

        if (clickCount < 0) {
        clickCount = 0;
        }

        document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
        document.getElementById("catCount").innerText = catCount; // Update catCount

        document.getElementById(`upgradeCost${index}`).innerText = formatNumber(roundCost(upgrade.cost));

        
        
        
        

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
    }

    //3  if (index === 11) {
            // Проверяем, достаточно ли у нас пшена
                //if (wheatTotalCount < 10 & woodTotalCount < 5) {
                //console.log("Not enough wheat to build");
                //return;
                //}
            //}
            
    checkUpgradeAvailability();
    
        // Добавьте условие, что если индекс равен 10 (лесопилка), то уменьшите количество пшена
        if (index === 10) {
            // Проверяем, достаточно ли у нас пшена
            if (wheatTotalCount < 10) {
                console.log("Not enough wheat to build the sawmill!");
                return;
            }
            }
            // Проверяем, достаточно ли у нас ресурсов для покупки
            if (clickCount < upgrade.cost) {
            console.log("Not enough resources to buy this upgrade!");
            return;
            }
    
            // Добавьте условие, что если индекс равен 7 (кот), то уменьшите количество пшена
            if (index === 7) {
                // Проверяем, достаточно ли у нас пшена
                    if (wheatTotalCount < 5) {
                    console.log("Not enough wheat");
                    return;
                    }
                }
            // Добавьте условие, что если индекс равен 10 (лесопилка), то уменьшите количество пшена
                if (index === 11) {
            // Проверяем, достаточно ли у нас пшена
                if (wheatTotalCount < 10 & woodTotalCount < 5) {
                console.log("Not enough wheat to build");
                return;
                }
            }

               if (index === 13) {
            // Проверяем, достаточно ли у нас пшена
                if (wheatTotalCount < 20 & woodTotalCount < 15  & stoneTotalCount < 5) {
                console.log("Not enough wheat to build");
                return;
                }
            }
            if (index ===21){
                if (goldCount <1){
                    return;
                }
            }
            if (index ===22){
                if (goldCount <2){
                    return;
                }
            }
            if (index ===23){
                if (goldCount <3){
                    return;
                }
            }

        // Проверяем, достаточно ли у нас ресурсов для покупки
            if (clickCount < upgrade.cost) {
            console.log("Not enough resources to buy this upgrade!");
            return;
            }
            
            updateUpgradeMarker(1);
    checkUpgradeAvailability();
    saveGame();
    
        

    
}
function updateUpgradeMarker(index) {
    const upgrade = upgrades[index - 1];
    const upgradeMarker = document.getElementById(`upgradeMarker${index}`);

    // Условие для показа/скрытия маркера
    if (clickCount >= upgrade.cost) {
        upgradeMarkers[index - 1] = true;
        upgradeMarker.style.display = 'none';
    } else {
        upgradeMarkers[index - 1] = false;
        upgradeMarker.style.display = 'block';
    }
}

//добавляем localStorage.setItem("stoneTotalCount", stoneTotalCount);
function saveGame() {
    localStorage.setItem("clickCount", clickCount);
    localStorage.setItem("clickValue", clickValue);
    localStorage.setItem("catCount", catCount);
    localStorage.setItem("wheatTotalCount", wheatTotalCount);
    localStorage.setItem("woodTotalCount", woodTotalCount);
    localStorage.setItem("stoneTotalCount", stoneTotalCount);
    localStorage.setItem("hoseTotalCount", hoseTotalCount);
    localStorage.setItem("metallTotalCount", metallTotalCount);
    localStorage.setItem("goldCount", goldCount);
    localStorage.setItem("numberFormat", numberFormat);
    localStorage.setItem("roundCost", roundCost);
    localStorage.setItem("upgrades", JSON.stringify(upgrades));

    // Сохранение информации о формате чисел

}


//4добавляем if (upgrades[UPGRADE_COUNT + 1]) {
        //__TotalCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_---;
        //__TotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_---;
        // Обновление значения на странице
       
        document.getElementById("metallTotalCount").innerText = formatNumber(roundCost(metallTotalCount));


// автоклик
        var autoClickInterval; // Переменная для хранения интервала автоклика
        var autoClickEnabled = false; // Флаг, указывающий, включен ли автоклик
        
        // Функция, которая будет выполнять клик
        function autoClick() {
            incrementClick();
        }
        
        // Функция для включения/выключения автоклика
        function toggleAutoClick() {
            if (!autoClickEnabled) {
                autoClickInterval = setInterval(autoClick, 1000); // Запускаем автоклик каждую секунду
                document.getElementById('toggleAutoClickButton').innerText = 'Выключить автоклик';
            } else {
                clearInterval(autoClickInterval); // Останавливаем автоклик
                document.getElementById('toggleAutoClickButton').innerText = 'Включить автоклик';
            }
            autoClickEnabled = !autoClickEnabled; // Инвертируем состояние флага
        }
        
        // Добавляем обработчик события к кнопке
        document.getElementById('toggleAutoClickButton').addEventListener('click', toggleAutoClick);

//обработчик основной кноки клика     
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
        document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
    }
    if (upgrades[UPGRADE_COUNT + 1]) {
        woodCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_wood;
        woodTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_wood;
        // Обновление значения на странице
        document.getElementById("woodTotalCount").innerText = formatNumber(roundCost(woodTotalCount));
    }
    
    if (upgrades[UPGRADE_COUNT + 1]) {
        stoneCountCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_stone;
        stoneTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_stone;
        // Обновление значения на странице
       
        document.getElementById("stoneTotalCount").innerText = formatNumber(roundCost(stoneTotalCount));
    }
    if (upgrades[UPGRADE_COUNT + 1]) {
        metallTotalCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_metall;
        metallTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_metall;
        // Обновление значения на странице
       
        document.getElementById("metallTotalCount").innerText = formatNumber(roundCost(metallTotalCount));
    }
    
    if (upgrades[UPGRADE_COUNT + 1]) {
        hoseTotalCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].home;
        hoseTotalCount += upgrades[UPGRADE_COUNT + 1].home;
        // Обновление значения на странице
        document.getElementById("hoseTotalCount").innerText = hoseTotalCount;
    }
    if (upgrades[UPGRADE_COUNT + 1]) {
        // Update gold count based on the number of houses built
        goldCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].home;
        goldCount += upgrades[UPGRADE_COUNT + 1].home;

        // Update the displayed gold count on the page
        document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));
    }
    updateAnimatedNumber();

    document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
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
    updateUpgradeMarker(1);
    saveGame();
    checkUpgradeAvailability();
    
    
}






//5 добавляем const notEnoughWheatForCamen = upgradeIndex === цифра индекса && (woodTotalCount < 1 || и так далее

function checkUpgradeAvailability() {
    for (let upgradeIndex = 1; upgradeIndex <= UPGRADE_COUNT; upgradeIndex++) {
        const upgradeButton = document.getElementById(`upgrade${upgradeIndex}`);
        const upgradeMarker = document.getElementById(`upgradeMarker${upgradeIndex}`);
        const upgrade = upgrades[upgradeIndex - 1];

        

        // Проверка, достаточно ли ресурсов для покупки
        const notEnoughResources = upgrade.cost > clickCount || !upgrade.opened;
        
        const notEnoughWheatForCat = upgradeIndex === 7 && wheatTotalCount < 5;

        // Проверка для лесопилки (индекс 10), учитывая также количество пшена 
        const notEnoughWheatForSawmill = upgradeIndex === 10 && wheatTotalCount < 10;

        // Проверка для 11 уровня (Camencita), учитывая количество дерева и пшена
        const notEnoughWheatForCamen = upgradeIndex === 11 && (woodTotalCount < 5 || wheatTotalCount < 10);

        const notEnoughWheatForMetall = upgradeIndex === 13 && (woodTotalCount < 20 || wheatTotalCount < 15 || stoneTotalCount < 5);

        const notEnoughGold1 = upgradeIndex === 21 && goldCount < 1;
        const notEnoughGold2 = upgradeIndex === 22 && goldCount < 2;
        const notEnoughGold3 = upgradeIndex === 23 && goldCount < 3;

        // Если недостаточно ресурсов, дерева или пшена, то кнопка становится неактивной
        upgradeButton.disabled = notEnoughGold1 || notEnoughGold2||notEnoughGold3
        || notEnoughWheatForCat 
        || notEnoughResources 
        || notEnoughWheatForSawmill 
        || notEnoughWheatForCamen 
        || notEnoughWheatForMetall;

        if (upgradeMarker) {
            if (upgradeMarkers[upgradeIndex - 1]) {
                upgradeMarker.style.display = 'block';
            } else {
                upgradeMarker.style.display = 'none';
                
            }
       
        }
    }
    saveGame();
   
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
    }, 350); // Adjust the time to match the fadeOut animation duration
}

//слайдер слева
function toggleNav() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");
    var screenWidth = window.innerWidth;

    if (screenWidth <= 700) { // Для мобильных устройств
        if (sidebar.style.width === "100%") {
            sidebar.style.width = "0";
            main.style.marginLeft = "0";
        } else {
            sidebar.style.width = "100%";
            main.style.marginLeft = "0%";
        }
    } else { // Для более широких экранов
        if (sidebar.style.width === "30%") {
            sidebar.style.width = "0";
            main.style.marginLeft = "0";
        } else {
            sidebar.style.width = "30%";
            main.style.marginLeft = "0%";
        }
    }
}
function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

// предупреждение о найденной игры в прошлом при попадании на стр

document.addEventListener('DOMContentLoaded', function () {
    // Check if there are saved local data
    const savedGameExists = localStorage.getItem("clickCount") !== null;

    

    if (savedGameExists) {
        // If saved data exists, show a warning window
        const confirmation = window.confirm("У вас есть сохранённые данные, загрузить прошлый сеанс игры?");
        
        if (confirmation) {
            // If the player chooses to load saved data, call the loadGame function
            loadGame();
            showLoadNotification();
        } else {
            // If the player chooses not to load saved data, continue with the new game
            showNotification('info', 'New game started!');
        }
    }

    // Add your existing event listeners and other initialization code here
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



//gacha контейнер

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

function closePopup() {
    document.getElementById("containerPopup").style.display = "none";
}

// Добавляем обработчик события для кнопки закрытия
document.getElementById("closePopupButton").addEventListener("click", closePopup);

function openContainer(itemsPerContainer) {
    // Hide all container and result elements initially
    hideAllContainers();
    
    // Отображаем дополнительное окно
    document.getElementById("containerPopup").style.display = "block";
    

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
    let totalReward = 0;

    for (let i = 0; i < itemsPerContainer; i++) {
        let rarity = calculateRarity();
        let isElite = Math.random() < eliteChance;
        let itemClass = getItemClass(rarity, isElite);

        if (i >= itemsInColumn) {
            itemClass += " right-column";
        }

        if (i === itemsInColumn - 1) {
            containerContent.push('<br>');
        }

        let rewardIncrement = 0;
        let rewardIncrementgold = 0;  // Initialize for each item
        switch (rarity) {
            case "Легендарный":
                rewardIncrement = getRandomReward(15300, 15000);
                rewardIncrementgold = getgoldCount(10,10);
                break;
            case "Эпический":
                rewardIncrement = getRandomReward(2500, 2000);
                break;
            case "Золотой":
                rewardIncrement = getRandomReward(7500, 8500);
                rewardIncrementgold = getgoldCount(5,5);
                break;
            case "Серебрянный":
                rewardIncrement = getRandomReward(300, 300);
                break;
            case "Элитный":
                rewardIncrement = getRandomReward(101000, 100000);
                rewardIncrementgold = getgoldCount(50,50);
                break;
            case "Ресурс 1":
            case "Ресурс 2":
                rewardIncrement = getRandomReward(10, 150);
                break;
            default:
                rewardIncrement = getRandomReward(1, 100);
        }

        totalReward += rewardIncrement;
        clickCount += rewardIncrement;
        goldCount += rewardIncrementgold;

        document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
        
        itemRewardInfo = `${rarity} +${rewardIncrement} +${rewardIncrementgold}`;
        containerContent.push(`<div class="item ${itemClass}">${getItemImage(rarity)} ${itemRewardInfo}</div> `);

        if (isElite) {
            eliteChance = baseEliteChance;
        }
    }

    // Display total reward information in the rewardInfo div
    document.getElementById("rewardInfo").innerHTML = `Total Reward: +${totalReward} Clicks`;

    resultElement.innerHTML = containerContent.join('');

    setTimeout(() => {
        document.querySelectorAll('.item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    }, 500);

   
    function getRandomReward(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function getgoldCount(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
   document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));

 

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
            return '<img src="gacha/12802fb0a815.jpg" alt="Legendary">';
        case "Эпический":
            return '<img src="gacha/574ee342e6b1.jpg" alt="Epic">';
        case "Золотой":
            return '<img src="gacha/9b8e093aa9bc.jpg" alt="Golden">';
        case "Серебрянный":
            return '<img src="gacha/f361537f27e1.jpg" alt="Silver">';
        case "Элитный":
            return '<img src="gacha/2964ff176157.jpg" alt="Elite">';

            case "Ресурс 1":
                    return '<img src="gacha/Tree.png" alt="st1">';
            case "Ресурс 2":
                    return '<img src="gacha/Wood.png" alt="st2">';
        default:
            return '<img src="gacha/223ad0522821.jpg" alt="Common">';
    
    }
}
}

