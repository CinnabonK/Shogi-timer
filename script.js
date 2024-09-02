let timerInterval;
let currentTimer = 'right'; // 'left' or 'right'

const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const leftTimeDisplay = document.getElementById('left-time');
const rightTimeDisplay = document.getElementById('right-time');

let leftTime = 0;
let rightTime = 0;
let runningTime = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        runningTime++;
        if (currentTimer === 'left') {
            leftTime++;
            leftTimeDisplay.textContent = formatTime(leftTime);
        } else {
            rightTime++;
            rightTimeDisplay.textContent = formatTime(rightTime);
        }
    }, 1000);
}

function switchTurn() {
    clearInterval(timerInterval);
    runningTime = 0;
    if (currentTimer === 'left') {
        currentTimer = 'right';
        rightButton.disabled = true;
        leftButton.disabled = false;
    } else {
        currentTimer = 'left';
        leftButton.disabled = true;
        rightButton.disabled = false;
    }
    startTimer();
}

leftButton.addEventListener('click', switchTurn);
rightButton.addEventListener('click', switchTurn);

// Initial setup
leftButton.disabled = false;
rightButton.disabled = true;
startTimer();
