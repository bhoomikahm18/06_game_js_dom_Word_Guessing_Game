const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    hint = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span"),
    wrongletter = document.querySelector(".wrong-letter span"),
    typingInput = document.querySelector(".typing-input");

let word, maxGuesses, currects = [], incurrects = [];

function randomWord() {
    //getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    maxGuesses = 8; currects = []; incurrects = [];
    console.log(word);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongletter.innerText = incurrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;

    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incurrects.includes(` ${key}`) && !currects.includes(key)) {
        if (word.includes(key)) { //if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                //Showing matched letter in the input  value
                if (word[i] === key) {
                    currects.push(` ${key}`);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--; //decrement maxGuesses by 1
            incurrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongletter.innerText = incurrects;
    }
    typingInput.value = "";

    setTimeout(() => {
        if (currects.length === word.length) { //If user found all word
            alert(`Congrats! You you found the word ${word.toUpperCase()}`);
            randomWord(); //Calling randomWord function, so the game reset
        } else if (maxGuesses < 1) { //if user couldn't found all letters
            alert("Game Over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {
                //Showing all letter in the input
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    })
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());