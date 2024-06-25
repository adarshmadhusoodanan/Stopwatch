// script.js
let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startStopBtn.innerHTML = 'Pause';
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerHTML = 'Start';
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00 : 00 : 00 : 00';
    startStopBtn.innerHTML = 'Start';
    lapsList.innerHTML = '';
    lapCount = 0;
    lapBtn.disabled = true;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `Lap ${lapCount }:${display.innerHTML}`;
        lapsList.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
