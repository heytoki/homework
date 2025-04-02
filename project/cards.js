function makeDeck() {
    let suits = ['♠', '♡', '♣', '♢'];
    let val = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let cards = [];
    for (let s = 0; s < suits.length; s++) {
        for (let v = 0; v < val.length; v++) {
            cards.push(val[v] + suits[s]);
        }
    }
    return cards;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


// above is all setup

deck = makeDeck();
//shuffleArray(deck);

let flipped = []
let tries = 0;
function flip() { // handles onclick
    document.getElementById(this.id).style.opacity = 100; // remember to use this.-- to specify which element to change
    card = document.getElementById(this.id).innerHTML; // a string of the card eg. "A♠"
    tries++;
    flipped.push(card);
    check();
}

function isBlack(card) {
    if (card[card.length - 1] == '♣' || card[card.length - 1] == '♠') {
        return 1;
    } else {
        return 0;
    }
}
let score = 0;
function check() {
    if (flipped.length >= 3) {
        var val1 = flipped[0];
        var val2 = flipped[1];
        if (val1[0] == val2[0] && isBlack(val1) == isBlack(val2)) {
            score++;
        } else {
            document.getElementById(flipped[0]).style.opacity = 0;
            document.getElementById(flipped[1]).style.opacity = 0;
        }
        flipped.shift();
        flipped.shift();
        console.log(score)
    } // if the cards are same, shift and increase score >> not, shift and face cards down (line 29 but opacity = 0)
}

// below is the html
for (let i = 0; i < deck.length; i++) {
    var element = document.createElement("button");
    element.setAttribute('id', deck[i]);
    element.onclick = flip;
    if (isBlack(deck[i])) {
        element.setAttribute('class', 'black');
    } else {
        element.setAttribute('class', 'red');
    }
    document.getElementById('container').appendChild(element);
    document.getElementById(deck[i]).innerHTML = deck[i];
    if (score >= 25) {
        tries/=2;
        alert("You won! It took you " + tries + 1 + " flips.");
    }
}