// Buttons
const pomodoroButton = document.querySelector('.pomodoro_btn')
const shortButton = document.querySelector('.short_btn')
const longButton = document.querySelector('.long_btn')
const startButton = document.querySelector('.start_btn')
const clearButton = document.querySelector('.clear_btn')


// Fields
const minuteElement = document.querySelector('.minute')
const secondElement = document.querySelector('.second')

// Variables
let minute = 25,
    second = 0,
    isStarted = false,
    interval
    
const options = {
    pomodoro: 25,
    shortBreak:  5,
    longBreak: 15,
    mode: 'pomodoro',
}

document.querySelector('.pomodoro_chng').value = options.pomodoro
document.querySelector('.short_chng').value = options.shortBreak
document.querySelector('.long_chng').value = options.longBreak

// Listeners

startButton.addEventListener('click', () => {
    if(isStarted === false) {
        clearInterval(interval)
        interval = setInterval(tickPomodoro, 1000)
        startButton.textContent = "Pause"
        isStarted = true
    } else {
        clearInterval(interval)
        startButton.textContent = "Start"
        isStarted = false
    }
})

clearButton.addEventListener('click', () => {
    updateClock(options.mode)
})

pomodoroButton.addEventListener('click', () => {
    updateClock('pomodoro')
})

shortButton.addEventListener('click', () => {
    updateClock('shortBreak')
})

longButton.addEventListener('click', () => {
    updateClock('longBreak')
})

// functions

function submitChange(event) {
    event.preventDefault();

    options.pomodoro = event.target['pomodoro_chng'].value
    options.shortBreak = event.target['short_chng'].value
    options.longBreak = event.target['long_chng'].value

    updateClock(options.mode)
}

function tickPomodoro() {
    second--
    if (second < 0) {
        minute--
        second = 59
    }
    if(minute < 0) {
        clearInterval(interval)
        second = 0
    }
    minuteElement.innerText = `${minute}`.padStart(2, '0')
    secondElement.innerText = `${second}`.padStart(2, '0')

}

function updateClock(mode) {
    clearInterval(interval)
    minute = options[mode]
    second = 0
    minuteElement.innerText = `${minute}`.padStart(2, '0')
    secondElement.innerText = `${second}`.padStart(2, '0')
    startButton.textContent = "Start"
    isStarted = false
    options.mode = mode
}

