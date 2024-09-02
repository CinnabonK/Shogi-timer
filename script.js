let currentTurn = 'left';
let mode = 'byoyomi'; // デフォルトのモード
let initialTime = 300; // デフォルトの持ち時間（秒）
let timers = {
    left: { time: 0, interval: null },
    right: { time: 0, interval: null }
};

function startTimer(turn) {
    if (mode === 'byoyomi') {
        timers[turn].interval = setInterval(() => {
            timers[turn].time += 0.1;
            updateDisplay();
        }, 100);
    } else if (mode === 'fischer') {
        timers[turn].interval = setInterval(() => {
            timers[turn].time -= 1;
            updateDisplay();
        }, 1000);
    }
}

function stopTimer(turn) {
    clearInterval(timers[turn].interval);
    timers[turn].interval = null;
}

function updateDisplay() {
    document.getElementById('left-time').innerText = formatTime(timers.left.time);
    document.getElementById('right-time').innerText = formatTime(timers.right.time);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const millis = Math.floor((seconds % 1) * 100);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(2, '0')}`;
}

function changeTurn(turn) {
    if (currentTurn !== turn) {
        stopTimer(currentTurn);
        currentTurn = turn;
        startTimer(currentTurn);
    }
}

function setInitialTime() {
    initialTime = parseInt(document.getElementById('time').value, 10);
    timers.left.time = initialTime;
    timers.right.time = initialTime;
    updateDisplay();
}

document.getElementById('left-half').addEventListener('click', () => changeTurn('left'));
document.getElementById('right-half').addEventListener('click', () => changeTurn('right'));

document.getElementById('mode').addEventListener('change', (event) => {
    mode = event.target.value;
    if (timers.left.interval) {
        stopTimer(currentTurn);
        startTimer(currentTurn);
    }
});

setInitialTime(); // 初めに設定を反映
