let words = ['apple', 'banana', 'orange', 'pear'];

function getRandomWord() {
  let min = 0;
  let max = words.length;

  let random = (max, min) => Math.floor(Math.random() * (max - min) + min);
  return words.splice(words[random(max, min)], 1)[0];
}

class Game {
  constructor() {
    this.guesses;
    this.message = document.querySelector('#message');
    this.replay = document.querySelector('#replay');
    this.reset();
  }

  #guessHandler;
  #MAX_GUESSES = 6;

  reset() {
    this.word = getRandomWord();
    this.message.textContent = '';

    if (this.word === undefined) {
      this.message.textContent = "Sorry, I've run out of words!";
      this.disableKeypress();
    } else {
      this.guessWord;
      this.wrongGuesses = 0;
      this.firstGuess = true;
      this.lettersGuessed = [];
      this.renderTree();
      this.bindEvents();
    }
  }

  renderTree() {
    let apples = document.querySelector('#apples');
    apples.classList.remove(this.guessClass);
    this.guessClass = `guess_${this.wrongGuesses}`
    let word = document.querySelector('#spaces');

    if (this.firstGuess) {
      this.guessWord = this.word.split('').map(space => ' ');
      this.firstGuess = false;
    }

    document.querySelectorAll('#spaces span').forEach(span => span.remove());

    this.guessWord.forEach(space => {
      let span = document.createElement('span');
      span.textContent = space;
      word.insertAdjacentElement("beforeend", span);
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

    if (this.wrongGuesses === this.#MAX_GUESSES) {
      this.endGame('lose');
    } else if (this.guessWord.join('') === this.word) {
      this.endGame('win');
    }
    
    this.renderTree();
    this.renderGuesses();
  }

  endGame(result) {
    switch(result) {
      case("win"):
        this.message.textContent = 'You win!'
        document.body.classList.add('win');
        break;
      case("lose"):
        this.message.textContent = "Sorry! You're out of guesses"
        document.body.classList.add('lose');
        break;
    }

    this.disableKeypress();
  }

  disableKeypress() {
    document.removeEventListener("keypress", this.#guessHandler);
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
    this.#guessHandler = this.handleGuess.bind(this);
    document.addEventListener('keypress', this.#guessHandler);    
    this.replay.addEventListener("click", this.replayGame.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", e => {
  new Game();
});