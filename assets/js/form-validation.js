const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const numbersRegex = /^\d+$/;
const nameRegex = /\D/;
const contactForm = document.getElementById("contactForm");
const bookingForm = document.getElementById("bookingForm");
const leftFormDocument = document.getElementsByClassName("form-left")[0];
const inputs = leftFormDocument.getElementsByTagName('input');
const dateField = document.getElementById('eventDate');
const eventTypeField = document.getElementById('eventType');
const successPopup = document.getElementsByClassName('success-pop-up')[0];
const errorPopup = document.getElementsByClassName('error-pop-up')[0];

if (contactForm) {
    var submitContact = contactForm.getElementsByClassName('form-submit')[0];
    var textarea = contactForm.getElementsByTagName('textarea')[0];
}

if (bookingForm) {
    var submitBooking = bookingForm.getElementsByClassName('form-submit')[0];
}

if (localStorage.getItem('event') && eventTypeField) {
    eventTypeField.value = localStorage.getItem('event');
}

if (dateField) {
    dateField.onchange = function() {
        if (dateField.value === '') {
            dateField.classList.add("empty");
        } else {
            dateField.classList.remove("empty");
        }
    }
}

function isInputValid(input) {
    switch (input.id) {
        case 'lastName':    
        case 'firstName':
        case 'eventType':
        case 'eventDate':
        case 'fridayDate':
        case 'fridayTime':
        case 'message':
                                return input.value.length > 1 && input.value.length < 200
        case 'email':           return emailRegex.test(input.value);
        case 'fridayNumber':
        case 'eventNumber':     return numbersRegex.test(input.value);
        default:                return true;
    }
}

function toggleErrorField(input, hasError) {
    if (input.type !== "radio") {
        if (!isInputValid(input)) {
            input.classList.add('has-error');
            input.nextElementSibling.classList.remove('fade-out');
        } else {
            input.classList.remove('has-error');
            input.nextElementSibling.classList.add('fade-out');
        }
    } else {
        if (hasError === undefined) return;

        let radioError = document.getElementsByClassName('radio-error')[0];
        if (hasError) {
            input.classList.add('has-error');
            radioError.classList.remove('fade-out');
        } else {
            input.classList.remove('has-error');
            radioError.classList.add('fade-out');
        }
    }
}

function clearInputs() {
    let bookingFormEvent = document.getElementById('bookingFormEvent');
    let bookingFormFriday = document.getElementById('bookingFormFriday');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "submit") {
            inputs[i].value = '';
        }
    }

    if (textarea) {
        textarea.value = '';
    }

    if (bookingFormEvent) {
        let eventInputs = bookingFormEvent.getElementsByTagName('input');

        for (let i = 0; i < eventInputs.length; i++) {
            if (eventInputs[i].type !== "submit") {
                eventInputs[i].value = '';
            }
        }
    }

    if (bookingFormFriday) {
        let fridayInputs = bookingFormFriday.getElementsByTagName('input');

        for (let i = 0; i < fridayInputs.length; i++) {
            if (fridayInputs[i].type !== "submit") {
                fridayInputs[i].value = '';
            }
        }
    }
}

function showInputsError(inputs) {
    for (let i = 0; i < inputs.length; i++) {
        toggleErrorField(inputs[i])
    }
}

function togglePopup(hasSuccess) {
    if (hasSuccess) {
        if (errorPopup.className.indexOf('hidden') === -1) {
            errorPopup.classList.add('hidden');
        }

        successPopup.classList.remove('hidden');
        setTimeout(function () { successPopup.classList.add('hidden'); }, 5000);
        clearInputs();
    } else {
        if (successPopup.className.indexOf('hidden') === -1) {
            successPopup.classList.add('hidden');
        }

        errorPopup.classList.remove('hidden');
        setTimeout(function () { errorPopup.classList.add('hidden'); }, 5000);
    }
}

if (submitContact) {
    submitContact.addEventListener('click', function() {
        event.preventDefault();
        
        showInputsError(inputs);
    
        if (textarea) {
            toggleErrorField(textarea);
        }
    
        if (document.getElementsByClassName('has-error').length === 0) {
            togglePopup(true);
        } else {
            togglePopup(false);
        }
    });
}

if (submitBooking) {
    submitBooking.addEventListener('click', function() {
        event.preventDefault();

        let bookingFormEvent = document.getElementById('bookingFormEvent');
        let bookingFormFriday = document.getElementById('bookingFormFriday');

        if (!radioFriday.checked && !radioEvent.checked) {
            toggleErrorField(radioFriday, true);
            showInputsError(inputs);
        } else {
            showInputsError(inputs);

            if (radioFriday.checked) {
                showInputsError(bookingFormFriday.getElementsByTagName("input"));
            } else {
                showInputsError(bookingFormEvent.getElementsByTagName("input"));
            }
        }

        if (document.getElementsByClassName('has-error').length === 0) {
            togglePopup(true);
        } else {
            togglePopup(false);
        }
    });
}