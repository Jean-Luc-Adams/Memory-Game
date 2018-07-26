/*
 * Create a list that holds all of your cards
 */
const listOfCards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 const cardsContainer = document.querySelector(".deck");

 let openedCards = [];
 let matchedCards = [];

// Loop through and create each card
 for(let i = 0; i < listOfCards.length; i++) {
     const card = document.createElement("div");
     card.classList.add("card");
     card.innerHTML = "<i class='" + listOfCards[i] + "'</i>";
     cardsContainer.appendChild(card);

    // Create card click event
     card.addEventListener("click", function () {

        const currentCard = this;
        const lastCard = openedCards[0];

        if(openedCards.length === 1) {

            card.classList.add("open", "show");
            openedCards.push(this);

            // Match check
            if(currentCard.innerHTML === lastCard.innerHTML) {
               currentCard.classList.add('match');
               lastCard.classList.add('match');
               // "Resets the conditional for additional matches"
               matchedCards.push(currentCard, lastCard);
               openedCards = [];
               // Check for game over
               gameOver();
            } else {
                currentCard.classList.remove("open", "show");
                lastCard.classList.remove("open", "show");
                // Reset the conditional for additional non-matches
                openedCards = [];
            }
        } else {
            currentCard.classList.add("open", "show");
            openedCards.push(this);
           
        }
      
    })
 }




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function gameOver() {
    if(matchedCards.length === listOfCards.length) {
        alert("GOOD JOB!");
    }
}

