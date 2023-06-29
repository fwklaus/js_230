class Calculator {
  constructor() { 
    this.$result;
    this.$firstNum;
    this.$secondNum;
    this.$operator;
    this.$form = $('form');

    this.bindEvents();
  }

  selectElements() {
    this.$result = $('#result');
    this.$firstNum = $('#first-number');
    this.$secondNum = $('#second-number');
    this.$operator = $('#operator');
  }

  handleSubmission(e) {
    e.preventDefault();
    this.selectElements();
    let firstNum = Number(this.$firstNum.val());
    let secondNum = Number(this.$secondNum.val());
    
    switch(this.$operator.val()) {
      case('+'):
        this.$result.text(firstNum + secondNum);
        break;
      case('-'):
        this.$result.text(firstNum - secondNum);
        break;
      case('*'):
        this.$result.text(firstNum * secondNum);
        break;
      case('/'):
        this.$result.text(firstNum / secondNum);
        break;
    }
  }

  bindEvents() {
    this.$form.on("submit", this.handleSubmission.bind(this));
  }
}

$(function() {
  new Calculator();
});