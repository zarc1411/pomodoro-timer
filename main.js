const currentTime = document.getElementById('timerCircle');

const currentSessionDuration = document.getElementById('sessionDuration');
const decreaseSessionTimeButton = document.getElementById('decreaseSessionTime');

function appendZeroIfNeeded(currentMinutesOrSeconds) {
    if (currentMinutesOrSeconds < 10) {
        return '0';
    }
    return '';
}

const alterDuration = {
    ALLOWED: 1,
    NOT_ALLOWED: 2
}
Object.freeze(alterDuration);
let changeDuration = alterDuration.ALLOWED;

decreaseSessionTimeButton.addEventListener('click', () => {
    if (currentSessionDuration.innerText > 1 && changeDuration == alterDuration.ALLOWED) {
        currentSessionDuration.innerText = --currentSessionDuration.innerText;
        let currentMinutes = currentSessionDuration.innerText;
        currentSessionDuration.innerText = appendZeroIfNeeded(currentMinutes) + currentSessionDuration.innerText;
        currentTime.innerText = currentSessionDuration.innerText + ':00';
    }
});

const increaseSessionTimeButton = document.getElementById('increaseSessionTime');
increaseSessionTimeButton.addEventListener('click', () => {
    if (currentSessionDuration.innerText < 60 && changeDuration == alterDuration.ALLOWED) {
        currentSessionDuration.innerText = ++currentSessionDuration.innerText;
        currentTime.innerText = currentSessionDuration.innerText + ':00';
    }
});


const currentBreakDuration = document.getElementById('breakDuration');
const decreaseBreakTimeButton = document.getElementById('decreaseBreakTime');
decreaseBreakTimeButton.addEventListener('click', () => {
    if (currentBreakDuration.innerText > 1 && changeDuration == alterDuration.ALLOWED) {
        currentBreakDuration.innerText = --currentBreakDuration.innerText;
    }
});

const increaseBreakTimeButton = document.getElementById('increaseBreakTime');
increaseBreakTimeButton.addEventListener('click', () => {
    if (currentBreakDuration.innerText < 60 && changeDuration == alterDuration.ALLOWED) {
        currentBreakDuration.innerText = ++currentBreakDuration.innerText;
    }
});

const currentSession = {
    INACTIVE: 1,
    ACTIVE: 2
};
Object.freeze(currentSession);

const startTimerButton = document.getElementById('play');
let currentSessionState = currentSession.INACTIVE;

startTimerButton.addEventListener('click', initiateSession);

function initiateSession(e) {
    if (currentSessionState == currentSession.INACTIVE) {
        currentSessionState = currentSession.ACTIVE;
        changeDuration = alterDuration.NOT_ALLOWED;
        startTheTimer();
    }
}
let currentIntervalId;
function startTheTimer() {
    currentIntervalId = setInterval(function () {
        let currentSeconds = parseInt(currentTime.innerText.split(':')[1]);
        let currentMinutes = parseInt(currentTime.innerText.split(':')[0]);
        console.log(currentSeconds);
        if (currentSeconds == 0 && currentMinutes >= 1) {
            currentMinutes -= 1;
            currentMinutes = appendZeroIfNeeded(currentMinutes) + currentMinutes;
            currentSeconds = 59;
            setTimerText(currentMinutes, currentSeconds);
        }
        else {
            if (currentSeconds != 0) {
                --currentSeconds;
                currentSeconds = appendZeroIfNeeded(currentSeconds) + currentSeconds;
            }
            setTimerText(currentMinutes, currentSeconds);
        }
        if (currentSeconds == 0 && currentMinutes == 0) {
            currentMinutes = extendMinutes();
            currentMinutes = appendZeroIfNeeded(parseInt(currentMinutes)) + currentMinutes;
            currentSeconds = "00";
            setTimerText(currentMinutes, currentSeconds);
        }
    }, 1000);
}

function extendMinutes() {
    let currentMinutes = 0;
    if (currentSessionState == currentSession.ACTIVE) {
        currentMinutes += parseInt(currentBreakDuration.innerText);
        currentSessionState = currentSession.INACTIVE;
    }
    else {
        currentMinutes += parseInt(currentSessionDuration.innerText);
        currentSessionState = currentSession.ACTIVE;
    }
    return currentMinutes;
}

function setTimerText(currentMinutes, currentSeconds) {
    currentTime.innerText = `${currentMinutes}:${currentSeconds}`;
}

const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', restartSession);

function restartSession() {
    clearInterval(currentIntervalId);
    currentSessionDuration.innerText = '25';
    currentBreakDuration.innerText = '5';
    currentTime.innerText = "25:00";
    changeDuration = alterDuration.ALLOWED;
    currentSessionState = currentSession.INACTIVE;
}

const stopButton = document.getElementById('stop');
stopButton.addEventListener('click', stopSession);

function stopSession() {
    clearInterval(currentIntervalId);
    currentTime.innerText = currentSessionDuration.innerText + ':' + '00';
    changeDuration = alterDuration.ALLOWED;
    currentSessionState = currentSession.INACTIVE;
}

const pauseButton = document.getElementById('pause');
pauseButton.addEventListener('click', pauseSession);

function pauseSession() {
    clearInterval(currentIntervalId);
    currentSessionState = currentSession.INACTIVE;
}