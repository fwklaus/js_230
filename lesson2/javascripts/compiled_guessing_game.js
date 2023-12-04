"use strict";
document.addEventListener('DOMContentLoaded', e => {
    let form = document.querySelector('form');
    let input = document.querySelector('#guess');
    let messageDisplay = document.querySelector('p');
    let submit = document.querySelector('input[type="submit"]');
    let answer = randomNumber();
    let newGame = document.querySelector('a');
    let message;
    function randomNumber() {
        let min = 1;
        let max = 100;
        let r = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
        return r(min, max);
    }
    function notValidInteger(guessChar) {
        let char = parseInt(guessChar, 10);
        if (Number.isNaN(char))
            return true;
        if (char < 1 || char > 100)
            return true;
        return false;
    }
    function toggleSubmitButton(type = "reset") {
        if (type === 'new' && submit instanceof HTMLInputElement) {
            submit.classList.remove('off');
        }
        else if (type === 'reset' && submit instanceof HTMLInputElement) {
            submit.classList.add('off');
        }
        else {
            throw new Error("Invalid Inputs: Expected type to be 'reset' | 'new' ; expected submit to be subtype of HTMLInputElement");
        }
    }
    let GuessingGame = {
        recordGuess(event) {
            event.preventDefault();
            let guess;
            if (input) {
                guess = parseInt(input.value, 10) || 0;
            }
            else {
                throw new Error("Invalid input");
            }
            console.log(answer);
            if (notValidInteger(input.value)) {
                message = `Invalid guess. Must enter number between 1 and 100...`;
            }
            else {
                if (guess > answer) {
                    message = `My number is lower than ${guess}.`;
                }
                else if (guess < answer) {
                    message = `My number is higher than ${guess}.`;
                }
                else {
                    message = 'You guessed the number!';
                    toggleSubmitButton();
                }
            }
            if (messageDisplay) {
                messageDisplay.textContent = message;
            }
            else {
                throw new Error("Invalid selector: 'messageDisplay' expected to be valid subtype of Element");
            }
        },
        resetGame(_event) {
            this.bind();
            toggleSubmitButton('new');
            answer = randomNumber();
            if (messageDisplay && input) {
                messageDisplay.textContent = 'Pick a number between 1 and 100';
                input.value = '';
            }
            else {
                throw new Error("Invalid selector: 'messageDisplay' expected to be valid subtype of Element; 'input' expected to be valid subtype of HTMLInputElement");
            }
        },
        bind() {
            if (form && newGame) {
                form.addEventListener('submit', this.recordGuess.bind(this));
                newGame.addEventListener('click', this.resetGame.bind(this));
            }
            else {
                throw new Error("Invalid target or targets");
            }
        },
        init() {
            this.resetGame();
        }
    };
    GuessingGame.init();
});
