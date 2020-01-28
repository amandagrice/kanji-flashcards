let csv;
const cards = [];
let activeCard;

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
    const sideOptions = ["side-one", "side-two", "side-three"];
    let startingSide = sideOptions[getRandomInt(3)];
    activeCard = cards[getRandomInt(cards.length)];
    document.getElementById(startingSide).innerHTML = activeCard[startingSide];
}

function parseHeaders(headerString) {
    let headers = headerString.split(',');
    document.getElementById('header-one').innerHTML = headers[0];
    document.getElementById('header-two').innerHTML = headers[1];
    document.getElementById('header-three').innerHTML = headers[2];
}

function createCard(cardString) {
    const sides = cardString.split(',');
    return {
        'side-one': sides[0],
        'side-two': sides[1],
        'side-three': sides[2]
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function clearCardView() {
    document.getElementById("side-one").innerHTML = "";
    document.getElementById("side-two").innerHTML = "";
    document.getElementById("side-three").innerHTML = "";
}