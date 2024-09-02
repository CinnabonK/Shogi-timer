let currentTurn = 'left';
let timers = {
    left: { time: 0, interval: null },
    right: { time: 0, interval: null }
};

function startTimer(turn) {
    timers[turn].interval = setInterval(() => {
        timers[turn].time += 1;
        updateDisplay();
    }, 1000);
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
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function changeTurn(turn) {
    if (currentTurn !== turn) {
        stopTimer(currentTurn);
        currentTurn = turn;
        startTimer(currentTurn);
    }
}

document.getElementById('left-half').addEventListener('click', () => changeTurn('left'));
document.getElementById('right-half').addEventListener('click', () => changeTurn('right'));

startTimer(currentTurn);  // 初めに左側を開始
