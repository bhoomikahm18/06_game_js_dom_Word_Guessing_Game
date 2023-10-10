const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    hint = document.querySelector(".hint span"),
    wrongletter = document.querySelector(".wrong-letter span"),
    typingInput = document.querySelector(".typing-input");

let word, currects = [], incurrects = [];

function randomWord() {
    //getting random object from wordlist
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    console.log(word);

    hint.innerText = ranObj.hint;

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
        console.log(key);
        if (word.includes(key)) { //if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                //Showing matched letter in the input  value
                if (word[i] === key) {
                    currects.push(` ${key}`);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            incurrects.push(` ${key}`);
        }
    }
    wrongletter.innerText = incurrects;
    typingInput.value = "";
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());