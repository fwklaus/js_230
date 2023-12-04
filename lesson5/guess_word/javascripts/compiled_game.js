"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Game_guessHandler, _Game_MAX_GUESSES;
let words = ['apple', 'banana', 'orange', 'pear'];
function getRandomWord() {
    let min = 0;
    let max = words.length;
    let random = (max, min) => Math.floor(Math.random() * (max - min) + min);
    let randomIdx = random(max, min);
    let word = words.splice(randomIdx, 1)[0];
    return word ? word : null;
}
class Game {
    constructor() {
        // instance propeties defined at the top of the class
        this.guesses = null;
        this.message = document.querySelector('#message');
        this.replay = document.querySelector('#replay');
        this.word = null;
        _Game_guessHandler.set(this, null);
        this.guessWord = null;
        this.wrongGuesses = 0;
        this.firstGuess = true;
        this.guessClass = null;
        this.lettersGuessed = [];
        _Game_MAX_GUESSES.set(this, 6);
        this.reset();
        this.bindReplay();
    }
    reset() {
        this.word = getRandomWord();
        if (this.message) {
            this.message.textContent = '';
        }
        else {
            throw new Error("Invalid: expected 'message' property to be subtype of 'Element' | 'null'");
        }

        debugger;
        if (this.word === null) {          
            this.message.textContent = "Sorry, I've run out of words!";
            this.disableKeypress();
        }
        else {
            this.guessClass = null;
            this.guessWord = null;
            this.wrongGuesses = 0;
            this.firstGuess = true;
            this.lettersGuessed = [];
            this.renderTree();
            this.bindEvents();
        }
    }
    // should reset gui if first guess
    renderTree() {
        let apples = document.querySelector('#apples');
        if (this.guessClass) {
            apples.classList.remove(this.guessClass);
        }
        this.guessClass = `guess_${this.wrongGuesses}`;
        let wordContainer = document.querySelector('#spaces');
        if (this.firstGuess) {
            this.guessWord = this.word.split('').map(space => ' ');
            this.firstGuess = false;
        }
        document.querySelectorAll('#spaces span').forEach(span => span.remove());
        this.guessWord.forEach(space => {
            let span = document.createElement('span');
            span.textContent = space;
            wordContainer.insertAdjacentElement("beforeend", span);
        });
        apples.classList.add(this.guessClass);
    }
    handleGuess(event) {
        event.preventDefault();
        let key = event.key;
        let wrongGuess;
        if (key.length === 1
            && key.match(/[a-z]/i)
            && !this.lettersGuessed.includes(key)) {
            wrongGuess = true;
            this.lettersGuessed.push(key);
            this.word.split('').forEach((letter, idx) => {
                if (key === letter) {
                    this.guessWord.splice(idx, 1, letter);
                    wrongGuess = false;
                }
            });
            if (wrongGuess) {
                this.wrongGuesses += 1;
            }
        }
        if (this.wrongGuesses === __classPrivateFieldGet(this, _Game_MAX_GUESSES, "f")) {
            this.endGame('lose');
        }
        else if (this.guessWord.join('') === this.word) {
            this.endGame('win');
        }
        this.renderTree();
        this.renderGuesses();
    }
    endGame(result) {
        switch (result) {
            case ("win"):
                this.message.textContent = 'You win!';
                document.body.classList.add('win');
                break;
            case ("lose"):
                this.message.textContent = "Sorry! You're out of guesses";
                document.body.classList.add('lose');
                break;
        }
        this.disableKeypress();
    }
    disableKeypress() {
        if (__classPrivateFieldGet(this, _Game_guessHandler, "f") !== null) {
            document.removeEventListener("keypress", __classPrivateFieldGet(this, _Game_guessHandler, "f"));
        }
        else {
            throw new Error("Invalid: Cannot remove event listener of type `null`");
        }
    }
    renderGuesses() {
        this.guessesRemove();
        this.lettersGuessed.forEach(guess => {
            let span = document.createElement('span');
            span.textContent = guess;
            this.guesses.insertAdjacentElement("beforeend", span);
        });
    }
    guessesRemove() {
        this.guesses = document.querySelector('#guesses');
        let allGuesses = this.guesses.querySelectorAll('span');
        allGuesses.forEach(guess => guess.remove());
    }
    replayGame(event) {
        event.preventDefault();
        this.reset();
        document.body.classList.remove('win');
        document.body.classList.remove('lose');
        this.guessesRemove();
        this.lettersGuessed = [];
    }
    bindEvents() {
        __classPrivateFieldSet(this, _Game_guessHandler, this.handleGuess.bind(this), "f");
        document.addEventListener('keypress', __classPrivateFieldGet(this, _Game_guessHandler, "f"));
    }

    bindReplay() {
        this.replay.addEventListener("click", this.replayGame.bind(this));
    }
}
_Game_guessHandler = new WeakMap(), _Game_MAX_GUESSES = new WeakMap();
document.addEventListener("DOMContentLoaded", e => {
    new Game();
});
