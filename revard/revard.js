
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup_rev");
    const rewardAmountSpan = document.getElementById("rewardAmount");
    const absenceTimeSpan = document.getElementById("absenceTime");
    const collectButton = document.getElementById("collectButton");
    const collectButtonMain = document.getElementById("collectButtonMain");
    const coinDisplay = document.getElementById("clickCount"); // Измените на id элемента для кликов
    const timerDisplay = document.getElementById("timer");

    let lastTimeSeen = localStorage.getItem("lastTimeSeen");
    let timeOnPage = 0;

    coinDisplay.textContent = clickCount; // Обновляем отображение кликов

    if (lastTimeSeen) {
        const currentTime = Date.now();
        const timeElapsed = Math.floor((currentTime - lastTimeSeen) / 1000); // в секундах
        const reward = timeElapsed;

        if (reward > 0) {
            rewardAmountSpan.textContent = reward;
            absenceTimeSpan.textContent = timeElapsed;
            popup.classList.add("visible");
            clickCount += reward; // Добавляем вознаграждение к clickCount
            
            coinDisplay.textContent = clickCount; // Обновляем отображение кликов
        }
    }

    function updateTimeOnPage() {
        timeOnPage++;
        timerDisplay.textContent = timeOnPage;
    }

    setInterval(updateTimeOnPage, 1000);

    function collectReward() {
        clickCount += timeOnPage; // Добавляем время на странице к clickCount
        
        coinDisplay.textContent = clickCount; // Обновляем отображение кликов
        timeOnPage = 0;
        timerDisplay.textContent = timeOnPage;
    }

    collectButton.addEventListener("click", function () {
        popup.classList.remove("visible");
        localStorage.setItem("lastTimeSeen", Date.now());
    });

    collectButtonMain.addEventListener("click", function () {
        collectReward();
    });

    window.addEventListener("beforeunload", function () {
        localStorage.setItem("lastTimeSeen", Date.now());
    });
});

// Функция для увеличения кликов
function incrementClick() {
    clickCount += clickValue; // Увеличиваем clickCount

    // Предотвращаем отрицательное значение счетчика кликов
    if (clickCount < 0) {
        clickCount = 0;
    }

    localStorage.setItem("clickCount", clickCount); // Сохраняем обновленное значение
    const coinDisplay = document.getElementById("clickCount");
    if (coinDisplay) {
        coinDisplay.textContent = clickCount; // Обновляем отображение
    }
}
