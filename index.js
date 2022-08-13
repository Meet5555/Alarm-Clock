console.log('Welcome to Alarm Clock');
let setAlarm = document.getElementById('setAlarm')

setAlarm.addEventListener('input', dateValid)
// setAlarm.addEventListener('blur', dateValid)

let invalidText = document.getElementById('invalidText')

function dateValid() {
    let format = false
    let notPast = false
    let str = setAlarm.value;
    let regx = /^20[2,9][0-9]-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|[3][01])\s+([01][0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]$/
    
    if (str == '') {
        invalidText.innerText = "Please Enter Date & Time"
        setAlarm.classList.add("is-invalid")
        return false
    }
    else {
        setAlarm.classList.remove("is-invalid")
        if (regx.test(str)) {
            format = true
        }
        else {
            format = false
        }
        if (format) {            
            // console.log('Matched');
            setAlarm.classList.remove("is-invalid")

            let AlarmDate = new Date(setAlarm.value)
            let now = new Date()
            let timeToAlarm = AlarmDate - now
            if (timeToAlarm >= 0) {
                notPast = true
                setAlarm.classList.remove("is-invalid")
            }
            else {
                notPast = false
            }

            if (notPast) {
                // console.log('not past');
                return true
            }
            else {
                // console.log('past');
                invalidText.innerText = "Please Enter Future Time"
                setAlarm.classList.add("is-invalid")
                return false
            }
        }
        else {
            console.log('Not Matched');
            invalidText.innerText = "Please Enter Valid Format!"
            setAlarm.classList.add("is-invalid")
            return false
        }
    }
}

let submit = document.getElementById('submit')
submit.addEventListener('click', setAlarmFunc)

var audio = new Audio('alarmRing.mp3');
function ringBell() {
    audio.play();
}

function setAlarmFunc() {
    
    let AlarmDate = new Date(setAlarm.value)
    let now = new Date()
    let timeToAlarm = AlarmDate - now
    if (timeToAlarm >= 0) {
        setTimeout(() => {
            console.log("Ringing now...")
            ringBell();
        }, timeToAlarm);
    }
    if(dateValid()){
        console.log('set');
        let success = document.getElementById('success')
        success.classList.add('show')
    }
}