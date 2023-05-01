document.addEventListener('DOMContentLoaded', e => {
  let textField = document.querySelector('.text-field');
  let content = document.querySelector('.content');

  let CustomInput = {
    toggleCursor() {
      textField.classList.toggle('cursor');
    },

    addFocused(event) {
      event.stopPropagation();
      if (!textField.classList.contains('focused')) {
        this.interval = setInterval(this.toggleCursor.bind(this), 500);
      }
      textField.classList.add('focused');
    },

    removeFocused(event) {
      clearInterval(this.interval);
      textField.classList.remove('focused');
    },

    handleKeypresss(event) {
      if (textField.classList.contains('focused')) {
        if (event.key === 'Shift' || event.key === 'Control') return;

        if (event.ctrlKey && event.key === 'Backspace') {
          let text = content.textContent.split(' ');
          content.textContent = text.slice(0, -1).join(' ');
        } else if (event.shiftKey) {
          content.textContent += (event.key).toUpperCase();
        } else if (event.key === 'Backspace') {
          content.textContent = content.textContent.slice(0, -1);
        } else {
          content.textContent += event.key;
        }
      }
    },

    bind() {
      textField.addEventListener('click', this.addFocused.bind(this));
      document.addEventListener('keyup', this.handleKeypresss.bind(this));
      document.addEventListener('click', this.removeFocused.bind(this));
    },

    init() {
      this.bind();
    }
  }

  CustomInput.init();
});
