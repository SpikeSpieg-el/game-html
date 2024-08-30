const upgrades = [
    { cost: 20, level: 0, clickIncrease: 1, multiplier: 1.5, opened: false },
    { cost: 200, level: 0, clickIncrease: 2, multiplier: 2.4, opened: false },
    { cost: 500, level: 0, clickIncrease: 5, multiplier: 3.2, opened: false },
    { cost: 1000, level: 0, clickIncrease: 10, multiplier: 5, opened: false },
    { cost: 3000, level: 0, clickIncrease: 20, multiplier: 5.25, opened: false },
    { cost: 5000, level: 0, clickIncrease: 50, multiplier: 6.10, opened: false },
{ cost: 100, level: 0, clickIncrease: 0, multiplier: 1.1, opened: false, catCountIncrease: 1 },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 8, opened: false, image: "OIG.3NJJoFBIJGj4Z.png"},
    { cost: 100, level: 0, clickIncrease: 1.5, multiplier: 1.1, opened: false, resourceIncrease: 0.1, image: "Pole.png"},
    { cost: 200, level: 0, clickIncrease: 0, multiplier: 1.4, opened: false, resourceIncrease_wood: 1, image: " forest_pilka.png"},
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_stone: 1, image: "OIG.zBJ2V.png" },
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 5.25, opened: false, home: 1, image: " dom1.png"}, 
    { cost: 300, level: 0, clickIncrease: 0, multiplier: 1.8, opened: false, resourceIncrease_metall: 1, image: "OIG.bFY9BU.png" },
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
    { cost: 5000000, level: 0, clickIncrease: 100000, multiplier: 11, opened: false },
    { cost: 500, level: 0, clickIncrease: 0, multiplier: 1, opened: false }
];//1{ cost: 300, level: 0, clickIncrease: 0, multiplier: 1.85, opened: false, resourceIncrease_stone: 1, image: "OIG.zBJ2V.png" }


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

let goldCount = 10;
let clickCount = 0;
let clickValue = 1;
const UPGRADE_COUNT = upgrades.length;
let catCount = 5;

let isAnimating = false;
let upgradeMarkers = Array(UPGRADE_COUNT).fill(false);

// updateAllUpgradeProgress();


vkBridge.send("VKWebAppInit", {})
        .then(() => {
            console.log('VK Bridge инициализирован');
    })
    .catch((error) => {
        console.error('Ошибка инициализации VK Bridge:', error);
});
vkBridge.send('VKWebAppScroll', {
    top: 1,
    speed: 600
    }) 
    .then((data) => { 
      if (data.top) {
        // Окно браузера прокручено
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error);
    });
    bridge.send('VKWebAppScrollTopStart')
  .then((data) => { 
    if (data.result) {
      // События отправляются
    }
  })
  .catch((error) => {
    // Ошибка
    console.log(error);
  });
    vkBridge.send('VKWebAppShowBannerAd', {
        banner_location: 'bottom'
        })
       .then((data) => { 
          if (data.result) {
            // Баннерная реклама отобразилась
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
    vkBridge.send('VKWebAppGetUserInfo', {
            })
            .then((data) => { 
              if (data.id) {
                // Данные пользователя получены
                console.log(data);
              }    
            })
            .catch((error) => {
              // Ошибка
              console.log(error);
            });

 
  
let numberFormat = localStorage.getItem("numberFormat") || 'decimal';
function roundCost(cost) {
    return Math.round(cost * 10) / 10;
}

function formatNumber(number, notation) {
    if (notation === 'scientific') {
        return number.toExponential(2);
    } else if (notation === 'engineering') {
        const exp = Math.floor(Math.log10(Math.abs(number)));
        const base = Math.pow(10, exp - (exp % 3));
        const adjusted = number / base;
        return adjusted.toFixed(2) + 'e' + exp;
    } else {
        if (number >= 1000000000000) {
            return (number / 1000000000000).toFixed(1) + 'T';
        }
        if (number >= 1000000000) {
            const billions = Math.floor(number / 1000000000);
            const remainder = number % 1000000000;
            return billions.toLocaleString() + ',' + (remainder / 1000000).toFixed(1) + 'B';
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'M';
        }
        return number.toLocaleString(); // fallback to default formatting if number is smaller than 1000
    }
}

//2if (index === 11) {
        //wheatTotalCount -= 10;
        //woodTotalCount -=5;
        //document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));
        //document.getElementById("woodTotalCount").innerText = woodTotalCount;

function buyUpgrade(index) {
    
            const upgrade = upgrades[index - 1];
        
            if (clickCount < upgrade.cost) {
                console.log("Not enough resources to buy this upgrade!");
                return;
            }
            
            clickCount -= upgrade.cost;
            upgrade.level++;
            clickValue += upgrade.clickIncrease;
            upgrade.cost = Math.round(upgrade.cost * upgrade.multiplier);
            updateAllUpgradeProgress();
        
            if (upgrade.resourceIncrease) { 
                clearInterval(timeWheatInterval);
                timeWheatInterval = setInterval(function() {
                    timeWheatPlus(upgrade); 
                }, 5000);
                updateProgressBarWheat(progressBarWidth = 0);
                saveGame();
                if (upgrade.level > 1){
                    upgrade.resourceIncrease +=0.1;
                }
                if (upgrade.level ==1){
                    setInterval(updateProgressBarWheat, 50);
                }
                
                // Обновление значения на странице
                document.getElementById("wheatTotalCount").innerText = formatNumber((wheatTotalCount)); 
                document.getElementById("upgradeResourceIncrease").innerText = formatNumber(roundCost(upgrade.resourceIncrease));

                saveGame();
            }

             // Check if the upgrade affects woodCount лес
        if (upgrade.resourceIncrease_wood) {
            clearInterval(timeWoodInt);
            timeWoodInt = setInterval(function(){
                timeWoodPlus(upgrade);
            }, 6000);
            updateprogressBarWood(BarWood = 0);
            saveGame();
            if (upgrade.level > 1){
                upgrade.resourceIncrease_wood +=1;
            }
            if (upgrade.level ==1){
                setInterval(updateprogressBarWood, 60);
            }
    
            // Обновление значения на странице
            document.getElementById("woodTotalCount").innerText = formatNumber(roundCost(woodTotalCount));
            document.getElementById("upgradeResourceIncrease_wood").innerText = formatNumber(roundCost(upgrade.resourceIncrease_wood));
            saveGame();
            }
            if (upgrade.resourceIncrease_stone) {
                clearInterval(timeStoneInt);
                timeStoneInt = setInterval(function(){
                    timeStonePlus(upgrade);
                }, 8000);
                updateprogressBarStone(BarStone = 0);
                saveGame();
                if (upgrade.level > 1){
                    upgrade.resourceIncrease_stone +=1;
                }
                if (upgrade.level ==1){
                    setInterval(updateprogressBarStone, 80);
                }
    
            // Обновление значения на странице
            document.getElementById("stoneTotalCount").innerText = formatNumber(roundCost(stoneTotalCount));
            document.getElementById("upgradeResourceIncrease_stone").innerText = formatNumber(roundCost(upgrade.resourceIncrease_stone));
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
                document.getElementById("wheatTotalCount").innerText = formatNumber((wheatTotalCount));
                }
    
            // Уменьшаем пшено только для лесопилки 
            if (index === 10) {
            wheatTotalCount -= 10;
            document.getElementById("wheatTotalCount").innerText = formatNumber((wheatTotalCount));
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
            document.getElementById("wheatTotalCount").innerText = formatNumber((wheatTotalCount));
            document.getElementById("woodTotalCount").innerText = woodTotalCount;
            }
    
            if (index === 13) {
            wheatTotalCount -= 20;
            woodTotalCount -=15;
            stoneTotalCount -=5;
            clickValue = clickValue *1.2;
            document.getElementById("clickValue").innerText = formatNumber(roundCost(clickValue));
            document.getElementById("wheatTotalCount").innerText = formatNumber((wheatTotalCount));
            document.getElementById("woodTotalCount").innerText = woodTotalCount; 
            document.getElementById("stoneTotalCount").innerText = stoneTotalCount;
            document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
            }
    
            if (clickCount < 0) {
            clickCount = 0;
            }
    
            document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
            document.getElementById("catCount").innerText = catCount; // Update catCount
            document.getElementById("clickValue").innerText = formatNumber(roundCost(clickValue));
            document.getElementById(`upgradeCost${index}`).innerText = formatNumber(roundCost(upgrade.cost));

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
        }
    

       
        var timeWheatInterval;
        var progressBarWidth = 0;
        var progressBarWheat;

        function timeWheatPlus(upgrade) {
            if (upgrade && typeof upgrade === 'object' && 'resourceIncrease' in upgrade) {
                wheatTotalCount += upgrade.resourceIncrease;
                document.getElementById("wheatTotalCount").innerText = formatNumber((wheatTotalCount));
                
            }
        }
        function updateProgressBarWheat() {
            progressBarWidth += (50 / (5000 / 100)); // Increase width by 30/3000 per millisecond
            if (progressBarWidth > 100) {
                progressBarWidth = 0; // Reset progress bar to 0 when it reaches 100%
            }
            document.getElementById("progressBarWheat").style.width = progressBarWidth + "%";
        }

        var timeWoodInt;
        var BarWood = 0;
        var progressBarWood;
        function timeWoodPlus(upgrade){
            if (upgrade && typeof upgrade === 'object' && 'resourceIncrease_wood' in upgrade){
                woodTotalCount += upgrade.resourceIncrease_wood;
                document.getElementById("woodTotalCount").innerText = formatNumber((woodTotalCount));
            }
        }
        function updateprogressBarWood() {
            BarWood += (60 / (6000 / 100)); // Increase width by 30/3000 per millisecond
            if (BarWood > 100) {
                BarWood = 0; // Reset progress bar to 0 when it reaches 100%
            }
            document.getElementById("progressBarWood").style.width = BarWood + "%";
        }

        var timeStoneInt;
        var BarStone = 0;
        var progressBarStone;
        function timeStonePlus(upgrade){
            if (upgrade && typeof upgrade === 'object' && 'resourceIncrease_stone' in upgrade){
                stoneTotalCount += upgrade.resourceIncrease_stone;
                document.getElementById("stoneTotalCount").innerText = formatNumber((stoneTotalCount));
            }
        }
        function updateprogressBarStone() {
            BarStone += (80 / (8000 / 100)); // Increase width by 30/3000 per millisecond
            if (BarStone > 100) {
                BarStone = 0; // Reset progress bar to 0 when it reaches 100%
            }
            document.getElementById("progressBarStone").style.width = BarStone + "%";
        }
        

                  
function updateUpgradeProgress(index) {
    const upgrade = upgrades[index - 1];
    const progress = document.getElementById(`upgradeProgress${index}`);
    const progressBarWidth = (clickCount / upgrade.cost) * 100;
    progress.style.width = progressBarWidth + "%";
}
function updateAllUpgradeProgress() {
    // Для улучшений с индексами 1-6
    for (let i = 1; i <= 6; i++) {
        updateUpgradeProgress(i);
    }
    // Для улучшений с индексами 14-20
    for (let i = 14; i <= 20; i++) {
        updateUpgradeProgress(i);
    }
    // Для улучшения с индексом 24
    updateUpgradeProgress(24);
    
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

    localStorage.setItem("wheatTotalCount", wheatTotalCount.toString());
    

    

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
                showClikNotification();
            } else {
                clearInterval(autoClickInterval); // Останавливаем автоклик
                document.getElementById('toggleAutoClickButton').innerText = 'Включить автоклик';
            }
            autoClickEnabled = !autoClickEnabled; // Инвертируем состояние флага
        }
        
        // Добавляем обработчик события к кнопке
        document.getElementById('toggleAutoClickButton').addEventListener('click', toggleAutoClick);
        
//4добавляем if (upgrades[UPGRADE_COUNT + 1]) {
        //__TotalCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_---;
        //__TotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_---;
        // Обновление значения на странице
function incrementClick() {
    // Увеличиваем счетчик кликов на значение clickValue
    clickCount += clickValue;

    // Предотвращаем отрицательное значение счетчика кликов
    if (clickCount < 0) {
        clickCount = 0;
    }

// Проверяем доступность апгрейдов и отображаем их на странице
for (let i = 1; i <= UPGRADE_COUNT; i++) {
    const upgrade = upgrades[i - 1];
    const upgradeContainer = document.querySelector(`.hidden${i}`);
    const upgradeCostSpan = document.getElementById(`upgradeCost${i}`);
    updateAllUpgradeProgress(); // Прогресс бар index 1 (пока что)

    // Если счетчик кликов достаточно велик и апгрейд еще не открыт, открываем его
    if (clickCount >= upgrade.cost && !upgrade.opened) {
        // Сначала меняем display на block
        upgradeContainer.style.display = 'block';

        // Небольшая задержка, чтобы дать время браузеру применить display: block
        setTimeout(() => {
            upgradeContainer.classList.add('visible');
        }, 10); // 10 мс достаточно для запуска анимации

        upgradeCostSpan.innerText = upgrade.cost;
        upgrade.opened = true;
        // Показываем уведомление о доступности апгрейда
        showNotification('success', `Upgrade ${i} is now available!`);
    }
    saveGame();
}


    

    // Обновляем счетчики ресурсов, если соответствующий апгрейд доступен
    if (upgrades[UPGRADE_COUNT + 1]) {
        wheatCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease;
        wheatTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease;
        document.getElementById("wheatTotalCount").innerText = formatNumber(roundCost(wheatTotalCount));

        woodCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_wood;
        woodTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_wood;
        document.getElementById("woodTotalCount").innerText = formatNumber(roundCost(woodTotalCount));

        stoneCountCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_stone;
        stoneTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_stone;
        document.getElementById("stoneTotalCount").innerText = formatNumber(roundCost(stoneTotalCount));

        metallTotalCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].resourceIncrease_metall;
        metallTotalCount += upgrades[UPGRADE_COUNT + 1].resourceIncrease_metall;
        document.getElementById("metallTotalCount").innerText = formatNumber(roundCost(metallTotalCount));

        hoseTotalCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].home;
        hoseTotalCount += upgrades[UPGRADE_COUNT + 1].home;
        document.getElementById("hoseTotalCount").innerText = hoseTotalCount;

        goldCount += upgrades[UPGRADE_COUNT + 1].level * upgrades[UPGRADE_COUNT + 1].home;
        goldCount += upgrades[UPGRADE_COUNT + 1].home;
        document.getElementById("goldCount").innerText = formatNumber(roundCost(goldCount));
    }

    // Обновляем анимированные числа и отображаем текущие значения
    updateAnimatedNumber();
    document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
    document.getElementById("clickValue").innerText = clickValue;

    // Обновляем маркеры апгрейдов, сохраняем игру и проверяем доступность апгрейдов
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

    // Set the position to stack notifications vertically from the top
    const offset = activeNotifications.length * notificationHeight;
    notification.style.top = offset + 'px';

    // Display the notification initially with slideDown animation
    notification.classList.add('slideDown');
    notification.style.display = 'block';

    document.getElementById('notifications-container').appendChild(notification);

    activeNotifications.push(notification);

    setTimeout(() => {
        closeNotification(notification);
    }, 3000);
}

function closeNotification(notification) {
    notification.classList.add('fadeOut');
    setTimeout(() => {
        notification.parentNode.removeChild(notification); // Remove the notification from the DOM
        activeNotifications = activeNotifications.filter(item => item !== notification);

        // Adjust positions of remaining notifications
        activeNotifications.forEach((activeNotification, index) => {
            activeNotification.style.top = index * notificationHeight + 'px';
        });
    }, 350); // Adjust the time to match the fadeOut animation duration
}


function showSaveNotification() {
    showNotification('success', 'Game saved successfully!');
    saveGame();
}

function showLoadNotification() {
    showNotification('info', 'Game loaded successfully!');
}
function showClikNotification(){
    showNotification('custom', 'auto Click on!')
}

function createNotification(type, text) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = text;
    notification.style.backgroundColor = notificationColors[type]; // Set consistent color
    return notification;
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
            clearCollection();           
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

// вариации для каждого предмета(готово только серебро)
let variations = {
    // legendary: [
       // { image: "gacha/legendary1.jpg", reward: { clicks: 15300, gold: 10 } },
       // { image: "gacha/legendary2.jpg", reward: { clicks: 15250, gold: 11 } },
       // { image: "gacha/legendary3.jpg", reward: { clicks: 15400, gold: 9 } },
       // { image: "gacha/legendary4.jpg", reward: { clicks: 15200, gold: 12 } },
       // { image: "gacha/legendary5.jpg", reward: { clicks: 15100, gold: 11 } }
    //],
    //epic: [
        //{ image: "gacha/epic1.jpg", reward: { clicks: 2500, gold: 0 } },
       // { image: "gacha/epic2.jpg", reward: { clicks: 2600, gold: 0 } },
       // { image: "gacha/epic3.jpg", reward: { clicks: 2400, gold: 0 } },
       // { image: "gacha/epic4.jpg", reward: { clicks: 2550, gold: 0 } },
        //{ image: "gacha/epic5.jpg", reward: { clicks: 2450, gold: 0 } }
    //],
    //golden: [
        //{ image: "gacha/golden1.jpg", reward: { clicks: 7500, gold: 5 } },
        //{ image: "gacha/golden2.jpg", reward: { clicks: 7600, gold: 6 } },
        //{ image: "gacha/golden3.jpg", reward: { clicks: 7400, gold: 4 } },
        //{ image: "gacha/golden4.jpg", reward: { clicks: 7700, gold: 7 } },
       // { image: "gacha/golden5.jpg", reward: { clicks: 7300, gold: 6 } }
    //],
    silver: [
        { image: "gacha/silver1.jpg", reward: { clicks: 300 } },
        { image: "gacha/silver2.jpg", reward: { clicks: 310 } },
        { image: "gacha/silver3.jpg", reward: { clicks: 290 } },
        { image: "gacha/silver4.jpg", reward: { clicks: 320 } },
        { image: "gacha/silver5.jpg", reward: { clicks: 280 } }
    ],
    //elite: [
        //{ image: "gacha/elite1.jpg", reward: { clicks: 101000, gold: 50 } },
        //{ image: "gacha/elite2.jpg", reward: { clicks: 100500, gold: 49 } },
        //{ image: "gacha/elite3.jpg", reward: { clicks: 101500, gold: 51 } },
       // { image: "gacha/elite4.jpg", reward: { clicks: 100000, gold: 52 } },
        //{ image: "gacha/elite5.jpg", reward: { clicks: 102000, gold: 48 } }
    //]
};

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
    let totalReward = 0;



    for (let i = 0; i < itemsPerContainer; i++) {
        let rarity = calculateRarity();
        let isElite = Math.random() < eliteChance;
        let itemClass = getItemClass(rarity, isElite);

        let rewardIncrement = 0;
        let rewardIncrementgold = 0;  // Initialize for each item
        let rewardVariant = 1; // Default reward variant
        switch (rarity) {
            case "Легенда":
                rewardIncrement = getRandomReward(15300, 15000);
                rewardIncrementgold = getgoldCount(10,10);
                rewardVariant = getRandomVariant(1, 5);
                break;
            case "Эпический":
                rewardIncrement = getRandomReward(2500, 2000);
                rewardVariant = getRandomVariant(1, 5);
                break;
            case "Золотой":
                rewardIncrement = getRandomReward(7500, 8500);
                rewardIncrementgold = getgoldCount(5,5);
                rewardVariant = getRandomVariant(1, 5);
                break;
            case "Серебро":
                // Get a random reward for silver items from the silver array
                rewardIncrement = getRandomSilverReward();
                rewardVariant = getRandomVariant(1, 5);
                break;
            case "Элитный":
                rewardIncrement = getRandomReward(101000, 100000);
                rewardIncrementgold = getgoldCount(50,50);
                rewardVariant = getRandomVariant(1, 5);
                break;
            case "Ресурс1":
            case "Ресурс2":
                rewardIncrement = getRandomReward(10, 150);
                break;
            default:
                rewardIncrement = getRandomReward(1, 100);
        }

        totalReward += rewardIncrement;
        clickCount += rewardIncrement;
        goldCount += rewardIncrementgold;

        document.getElementById("clickCount").innerText = formatNumber(roundCost(clickCount));
        
        // Check if the reward has gold and add it to the itemRewardInfo
        let itemRewardInfo = `${rarity} +${rewardIncrement}`;
        if (rewardIncrementgold > 0) {
            itemRewardInfo += ` +${rewardIncrementgold} золото`;
        }
        
        // Push the item with its rarity, reward, and reward variant
        containerContent.push(`<div class="item ${itemClass}">${getItemImage(rarity, rewardVariant)} ${itemRewardInfo}</div> `);

        if (isElite) {
            eliteChance = baseEliteChance;
        }
    }
    function getRandomSilverReward() {
    // Get a random index from 0 to the length of the silver array
    let randomIndex = Math.floor(Math.random() * variations.silver.length);
    // Return the reward value (clicks) for the selected silver item
    return variations.silver[randomIndex].reward.clicks;
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
        return Math.floor(Math.random() * (max - min + 1) + min)* clickValue;
    }
    function getgoldCount(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function getRandomVariant(min, max) {
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
        rarity = "Легенда";
    } else if (rand < 0.03) {
        rarity = "Эпический";
    } else if (rand < 0.037) {
        rarity = "Золотой";
    } else if (rand < 0.07) {
        rarity = "Серебро";
    } else if (rand < baseEliteChance + 0.47) {
        rarity = rand < baseEliteChance + 0.4 ? "Ресурс1" : "Ресурс2";
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
            case "Легенда":
                return "legendary";
            case "Эпический":
                return "epic";
            case "Золотой":
                return "golden";
            case "Серебро":
                return "silver";
            case "Элитный":
                return "elite";
            case "Ресурс1":
                return "st1";
            case "Ресурс2":
                return "st2";
            default:
                return "common";
        }
    }
}

function getItemImage(rarity, rewardVariant) {
    switch (rarity) {
        case "Легенда":
            return '<img src="gacha/12802fb0a815.jpg" alt="Legendary">';
        case "Эпический":
            return '<img src="gacha/574ee342e6b1.jpg" alt="Epic">';
        case "Золотой":
            return '<img src="gacha/9b8e093aa9bc.jpg" alt="Golden">';
        case "Серебро":
            switch (rewardVariant) {
                case 1:
                    return '<img src="gacha/silver1.jpg" alt="Silver">';
                case 2:
                    return '<img src="gacha/silver2.jpg" alt="Silver">';
                case 3:
                    return '<img src="gacha/silver3.jpg" alt="Silver">';
                case 4:
                    return '<img src="gacha/silver4.jpg" alt="Silver">';
                case 5:
                    return '<img src="gacha/silver5.jpg" alt="Silver">';
                default:
                    return '<img src="gacha/f361537f27e1.jpg" alt="Silver">';
            }
        case "Элитный":
            return '<img src="gacha/2964ff176157.jpg" alt="Elite">';
        case "Ресурс1":
            return '<img src="gacha/Tree.png" alt="st1">';
        case "Ресурс2":
            return '<img src="gacha/Wood.png" alt="st2">';
        default:
            return '<img src="gacha/223ad0522821.jpg" alt="Common">';
    
    }
}
}
