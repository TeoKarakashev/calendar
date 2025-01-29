let timer;
let totalSeconds;
let running = false;

const updateDisplay = () => {
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    document.getElementById('display').innerText =
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}

const startTimer = () => {
    if (running) return;

    const minutes = parseInt(document.getElementById('minutes').value) || 0;

    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    totalSeconds = minutes * 60 + seconds;

    if (totalSeconds <= 0) return;
    running = true;

    timer = setInterval(() => {
        if (!running) {
            return;
        }
        
        if (totalSeconds <= 0) {
            clearInterval(timer);
            running = false;
        } else {
            totalSeconds--;
            updateDisplay();
        }
    }, 1000);
    updateDisplay();
}

const pauseTimer = () => {
    clearInterval(timer)
    running = false;
}

const resetTimer = () => {
    clearInterval(timer);
    running = false;
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
    document.getElementById('display').innerText = '00:00';
}