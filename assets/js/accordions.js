const menuAccordion = document.getElementById('menu-accordion');
const menuAccordionItems = menuAccordion.getElementsByTagName('a');
const menuAccordionList = menuAccordion.getElementsByTagName('li');
const menuCards = document.getElementsByClassName('menu-list');
const bookButtons = document.getElementsByClassName('booknow');
const isSeasonalPage = document.getElementsByClassName('seasonal').length === 0 ? false : true;


if (isSeasonalPage) {
    let date = new Date();
    let month = date.getMonth();
    let menu = null;

    switch (month) {
        case 0:
        case 1:
        case 2: menu = "winter";
                break;
        case 3:
        case 4:
        case 5: menu = "spring";
                break;
        case 6:
        case 7:
        case 8: menu = "summer";
                break;
        case 9:
        case 10:
        case 11: menu = "autumn";
                 break;
        default: menu = "spring";
    }

    for (let i = 0; i < menuAccordionList.length; i++) {
        if (menuAccordionList[i].getAttribute('data-event-type') === menu) {
            menuAccordionList[i].classList.add('menu-selected');
            menuCards[i].classList.add('menu-open');
            break;
        }
    }
}

for (let i = 0; i < menuAccordionList.length; i++) {
    menuAccordionList[i].addEventListener('click', function () {
        event.preventDefault();
        document.getElementsByClassName('menu-selected')[0].classList.remove('menu-selected');
        this.classList.add('menu-selected');

        let sideMenuHeaderText = this.firstElementChild.innerHTML;
        let eventType = this.getAttribute('data-event-type');
        
        for (let i = 0; i < menuCards.length; i++) {
            if (menuCards[i].getAttribute('data-event-type') == eventType) {
                document.getElementsByClassName('menu-open')[0].classList.remove('menu-open');
                setTimeout(function () {
                    menuCards[i].classList.add('menu-open');
                    menuCards[i].firstElementChild.innerText = sideMenuHeaderText;
                }, 500)

            }
        }
    })
}

for (let i = 0; i < bookButtons.length; i++) {
    bookButtons[i].addEventListener('click', function () {
        let event = this.parentElement.getAttribute('data-event-type');

        switch(event) {
            case 'wedding1':
            case 'wedding2':        event = 'Wedding';
                                    break;
            case 'party':           event = 'Party';
                                    break;
            case 'confirmation':    event = 'Confirmation';
                                    break;
            case 'baptism1':        
            case 'baptism2':        event = 'Baptism';
                                    break;
            default:                event = '';
        }

        localStorage.setItem("event", event);
    });
}


