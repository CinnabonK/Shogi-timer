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
document.getElementById('initial-time').addEventListener('input', updateInitialTime);

function startTimers() {
    if (!activeTimer) {
        activeTimer = setInterval(() => {
            if (mode === 'fischer') {
                senteTime = updateTimer('sente-time', senteTime, true);
                goteTime = updateTimer('gote-time', goteTime, true);
            } else if (mode === 'sudden-death') {
                senteTime = updateTimer('sente-time', senteTime, false);
                goteTime = updateTimer('gote-time', goteTime, false);
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
    senteTime = 600;  // デフォルトの10分にリセット
    goteTime = 600;
    updateDisplay('sente-time', senteTime);
    updateDisplay('gote-time', goteTime);
}

function updateTimer(id, time, isFischer) {
    if (time > 0) {
        time -= 1;
        if (isFischer) {
            time += fischerIncrement;
        }
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
    const fischerInput = document.getElementById('fischer-time');
    const initialTimeInput = document.getElementById('initial-time');
    
    if (mode === 'fischer') {
        fischerInput.style.display = 'inline';
        initialTimeInput.placeholder = '開始時間（分）';
    } else if (mode === 'sudden-death') {
        fischerInput.style.display = 'none';
        initialTimeInput.placeholder = '開始時間（分）';
    }
}

function updateFischerTime() {
    fischerIncrement = parseInt(document.getElementById('fischer-time').value, 10) || 0;
}

function updateInitialTime() {
    const initialTime = parseInt(document.getElementById('initial-time').value, 10) || 10;
    senteTime = initialTime * 60;
    goteTime = initialTime * 60;
    updateDisplay('sente-time', senteTime);
    updateDisplay('gote-time', goteTime);
}
