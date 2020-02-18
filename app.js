let csv;
const cards = [];
let activeCard;
let activeCardIndex;

window.onload = function() {
    const fileInput = document.getElementById('file-input'),
        readFile = function () {
            const reader = new FileReader();
            reader.onload = function () {
                csv = reader.result;
                csv = csv.replace(/\r/g, "").split(/\n/);
                parseHeaders(csv[0]);
                for (let i = 1; i < csv.length; i++) {
                    cards.push(createCard(csv[i]));
                }
                setCard();
            };
            reader.readAsText(fileInput.files[0]);
        };

    fileInput.addEventListener('change', readFile);
};

function flip(id) {
    if (activeCard) {
        document.getElementById(id).innerHTML = activeCard[id];
    }
}

function setCard() {
    clearCardView();
    let sideOptions = ["side-one", "side-two", "side-three"];
    const startWithSelector = document.getElementById("start-with-selector");
    const selected = startWithSelector.options[startWithSelector.selectedIndex].value;
    activeCardIndex = getRandomInt(cards.length);
    activeCard = cards[activeCardIndex];
    let startingSide;
    if (selected !== 'any') {
        startingSide = selected
    } else {
        startingSide = sideOptions[getRandomInt(3)];
    }
    document.getElementById(startingSide).innerHTML = activeCard[startingSide];
}

function parseHeaders(headerString) {
    let headers = headerString.split(',');
    document.getElementById('header-one').innerHTML = headers[0];
    document.getElementById('header-two').innerHTML = headers[1];
    document.getElementById('header-three').innerHTML = headers[2];
    document.getElementById('op-one').innerHTML = headers[0];
    document.getElementById('op-two').innerHTML = headers[1];
    document.getElementById('op-three').innerHTML = headers[2];
}

function createCard(cardString) {
    const sides = cardString.split(',');
    let card = {
        'side-one': sides[0],
        'side-two': sides[1],
        'side-three': sides[2]
    };
    if (sides.length >= 5) {
        card['right'] = parseInt(sides[3]),
        card['wrong'] = parseInt(sides[4])
    }
    return card;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function clearCardView() {
    document.getElementById("side-one").innerHTML = "";
    document.getElementById("side-two").innerHTML = "";
    document.getElementById("side-three").innerHTML = "";
}

function showMe () {
    const checkbox = document.getElementById("metric-checkbox");
    let validationDisplay = "none";
    let nextCardDisplay = "block";
    if (checkbox.checked) {
        validationDisplay = "table";
        nextCardDisplay = "none";
    }
    document.getElementById("validation-buttons").style.display = validationDisplay;
    document.getElementById("next-card-button").style.display = nextCardDisplay;
}

function markCorrect() {
    cards[activeCardIndex]['right'] = cards[activeCardIndex]['right'] + 1;
    setCard();
}

function markWrong() {
    cards[activeCardIndex]['wrong'] = cards[activeCardIndex]['wrong'] + 1;
    setCard();
}