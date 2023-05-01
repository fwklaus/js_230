/*
document.addEventListener('DOMContentLoaded', e => {
  function moveCursor(event) {
    let divX = document.querySelector('div.x');
    let x = event.clientX;
    let y = event.clientY;

    divX.style.top = `${y}px`;
    divX.style.left = `${x}px`;
  }

  function changeColor(event) {
    let keypress = event.key;
    let horizontal = document.querySelector('.x .horizontal')
    let vertical = document.querySelector('.x .vertical')

    switch(keypress) {
      case('r'):
        horizontal.style.background = 'red';
        vertical.style.background = 'red';
        break;
      case('g'):
        horizontal.style.background = 'green';
        vertical.style.background = 'green';  
        break;
      case('b'):
        horizontal.style.background = 'blue';
        vertical.style.background = 'blue'; 
        break;
    }
  }

  // document.addEventListener('click', moveCursor);
  document.addEventListener('mousemove', moveCursor);
  document.addEventListener('keypress', changeColor)
});
*/

document.addEventListener('DOMContentLoaded', e=> {
  // write some JS to add a character counter that updates as the user types
  let countMessage = document.querySelector('p.counter');
  let textarea = document.querySelector('textarea');
  let chars;
  
  function initializeCount() {
    chars = 140;
    countMessage.textContent = `${chars} characters remaining`;
  }

  function incrementCount(_event) {
      chars -= 1;
      if (chars < 0) {
        textarea.classList.add('invalid');
      }
      countMessage.textContent = `${chars} characters remaining`;
  } 

  initializeCount();
  textarea.addEventListener('keypress', incrementCount);
});