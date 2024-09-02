let senteTime = 600;  // 初期時間（秒単位）
let goteTime = 600;   // 初期時間（秒単位）
let activeTimer = null;
let mode = 'sudden-death';  // デフォルトモード
let fischerIncrement = 0;

document.getElementById('start-button').addEventListener('click', startTimers);
document.getElementById('pause-button').addEventListener('click', pauseTimers);
document.getElementById('reset-button').addEventListener('click', resetTimers);
document.getElementById('mode-select').addEventListener('change', updateMode);
document.getElementById('fischer-time').addEventListener('input', updateFischerTime);

function startTimers() {
    if (!activeTimer) {
        activeTimer = setInterval(() => {
            if (mode === 'fischer') {
                senteTime = updateTimer('sente-time', senteTime);
                goteTime = updateTimer('gote-time', goteTime);
            } else {
                if (senteTime > 0) {
                    senteTime = updateTimer('sente-time', senteTime);
                }
                if (goteTime > 0) {
                    goteTime = updateTimer('gote-time', goteTime);
                }
            }
        }, 1000);
    }
}

function pauseTimers() {
    clearInterval(activeTimer);
    activeTimer = null;
}

function resetTimers() {
    clearInterval(activeTimer);
    activeTimer = null;
    senteTime = 600;
    goteTime = 600;
    updateDisplay('sente-time', senteTime);
    updateDisplay('gote-time', goteTime);
}

function updateTimer(id, time) {
    if (time > 0) {
        time -= 1;
        updateDisplay(id, time);
    } else {
        pauseTimers();
        alert(`${id === 'sente-time' ? '先手' : '後手'}の時間が切れました!`);
    }
    return time;
}

function updateDisplay(id, time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById(id).textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateMode() {
    mode = document.getElementById('mode-select').value;
}

function updateFischerTime() {
    fischerIncrement = parseInt(document.getElementById('fischer-time').value, 10) || 0;
}
