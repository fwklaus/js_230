document.addEventListener('DOMContentLoaded', e => {
  let form = document.querySelector('form');
  let input = document.querySelector('#guess');
  let answer = randomNumber();
  let messageDisplay = document.querySelector('p');
  let newGame = document.querySelector('a');
  let submit = document.querySelector('input[type="submit"]');
  let message;
  
  function randomNumber() {
    let min = 1;
    let max = 100;
    let r = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    return r(min, max);
  }

  function notValidInteger(guessChar) {
    let char = parseInt(guessChar, 10);

    if (Number.isNaN(char)) return true;
    if (char < 1 || char > 100) return true;

    return false;
  }

  function toggleSubmitButton(type = "reset") {
    if (type === 'new') {
      submit.classList.remove('off');
    } else {
      submit.classList.add('off');
    }
  }
  
  let GuessingGame = {
    recordGuess(event) {
      event.preventDefault();
      if (this.gameOver) {
        abort();
      }

      let guess = parseInt(input.value, 10) || 0;
      console.log(answer);
      if (notValidInteger(input.value)) {
        message = `Invalid guess. Must enter number between 1 and 100...`;
      } else {
        if(guess > answer) {
          message = `My number is lower than ${guess}.`;
        } else if (guess < answer) {
          message = `My number is higher than ${guess}.`;
        } else {
          message = 'You guessed the number!'
          toggleSubmitButton();
        }
      }
      
      messageDisplay.textContent = message;
    },

    resetGame(event) {
      this.bind();
      toggleSubmitButton('new');
      answer = randomNumber();
      messageDisplay.textContent = 'Pick a number between 1 and 100'
      input.value = '';
    },

    bind() {  
      form.addEventListener('submit', this.recordGuess.bind(this));
      newGame.addEventListener('click', this.resetGame.bind(this));
    },

    init() {
      this.resetGame();
    }
  }

  GuessingGame.init();
});