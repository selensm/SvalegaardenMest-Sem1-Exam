const bookButton = document.getElementsByClassName('booknow');
const menu = document.getElementById('menu');
const bookingForm = document.getElementById('form');

for(let i = 0; i < bookButton.length; i++) {
    bookButton[i].addEventListener('click', function () {
        event.preventDefault();
        menu.classList.toggle('hidden');
        bookingForm.classList.toggle('hidden')
        
        if (bookButton[i].innerText == 'CHANGE DATE') {
            bookButton[i].innerText = 'BOOK NOW';
        } else {
            bookButton[i].innerText = 'CHANGE DATE';
        }
    })
}
