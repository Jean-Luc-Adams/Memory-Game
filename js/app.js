//Global Scope Variables

const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let timerTime;
let matchedPairs = 0;
const totalMatchPairs = 8;

// Click event
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if (isValid(clickTarget)) {
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (clockOff) {
            startTimer();
            clockOff = false;
        }
        if (toggledCards.length === 2) {
            checkForMatching(clickTarget);
            addMove();
            starRating();
        }
    }
});

function toggleCard(card) {
    card.classList.toggle('open');
    card.classList.toggle('show');
}

function addToggleCard(clickTarget) {
    toggledCards.push(clickTarget);
    console.log(toggledCards);
}

// Check if the cards are matching
function isValid(clickTarget) {
    return (
        clickTarget.classList.contains('card') &&
        !clickTarget.classList.contains('match') &&
        toggledCards.length < 2 &&
        !toggledCards.includes(clickTarget)
    );
}

function checkForMatching() {
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className) {
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        matchedPairs++;
        if (matchedPairs === totalMatchPairs) {
            gameOver();
        }
    } else {
        setTimeout(() => {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
        }, 500);
    }
}

// Function for move counter
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

// Functions the star rating for game based on number of moves
function starRating() {
    if (moves === 16 || moves === 24) {
        removeStar();
    }
}

function removeStar() {
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        if (star.style.display !== "none") {
            star.style.display = "none";
            break;
        }
    }
}

// Functions for the timer, for it to start, stop, and display in-game
function startTimer() {
    timerTime = setInterval(() => {
        time++;
        displayTime();
    }, 1000);
    
}

function displayTime() {
    const timer = document.querySelector('.timer');
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (seconds < 10) {
        timer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
    }
}

function stopTimer() {
    clearInterval(timerTime);
}

document.querySelector('.restart').addEventListener('click', replayGame);
// Determines when the game is completed
function gameOver() {
    stopTimer();
    writeWinStats();
    toggleModal();
}

// Displays the game stats
function writeWinStats() {
    const timeStat = document.querySelector('.modal-time');
    const clockTime = document.querySelector('.timer').innerHTML;
    const movesStat = document.querySelector('.modal-moves');
    const starsStat = document.querySelector('.modal-stars');
    const stars = getStars();

    timeStat.innerHTML = `<i class="far fa-clock"></i> = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Star Rating = ${stars}`;
}

// Get a proper star rating for the win modal
function getStars() {
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars) {
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
}

//Toggles the win modal on and off
function toggleModal() {
    const modal = document.querySelector('.modal-background');
    modal.classList.toggle('hide');
}

document.querySelector('.modal-cancel').addEventListener('click', () => {
    toggleModal();
});

document.querySelector('.modal-retry').addEventListener('click', () => {
    replayGame();
});


// Resetting the Game
function resetGame() {
  resetTimer();
  resetMoveCounter();
  resetStarRating();
  resetCards();
  shuffleTheDeck();
}

function replayGame() {
    resetGame();
    toggleModal();
}

function resetTimer() {
    stopTimer();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoveCounter() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStarRating() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

function resetCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
        card.className = 'card';
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Shuffles the cards upon restart or refreshing the screen
function shuffleTheDeck() {
    const cardsShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsShuffle);
    for (card of shuffledCards) {
        deck.appendChild(card);
    }
}

shuffleTheDeck();

 