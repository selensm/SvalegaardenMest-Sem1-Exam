const radioFriday = document.getElementById('radioFriday');
const radioEvent = document.getElementById('radioEvent');
const bookingFormEvent = document.getElementById('bookingFormEvent');
const bookingFormFriday = document.getElementById('bookingFormFriday');

function removeRadioErrors() {
    radioFriday.classList.remove('has-error');
    radioEvent.classList.remove('has-error');
}

radioEvent.addEventListener('click', function () {
    let radioError = document.getElementsByClassName('radio-error')[0];
    if (radioEvent.checked) {
        hideFormFriday();
        radioError.classList.add('fade-out');
        removeRadioErrors();
    } else {
        hideFormEvent()
    }
})

radioFriday.addEventListener('click', function () {
    let radioError = document.getElementsByClassName('radio-error')[0];
    if (radioFriday.checked) {
        hideFormEvent()
        radioError.classList.add('fade-out');
        removeRadioErrors();
    } else {
        hideFormFriday()
    }
})


function hideFormFriday () {
    bookingFormFriday.classList.add('fade-out');
    setTimeout(function () {
        bookingFormEvent.classList.remove('fade-out');
    }, 300)
}

function hideFormEvent () {
    bookingFormEvent.classList.add('fade-out');
    setTimeout(function () {
        bookingFormFriday.classList.remove('fade-out');
    }, 300)
}