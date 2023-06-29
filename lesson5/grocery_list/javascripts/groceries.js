
  // ckear the form's contents
  // optional - create a print-only stylesheet

class GroceryList {
  constructor() {
    this.$form = $('form');
    this.$list = $('#grocery-list');
    this.bindEvents();
  }

  addItem(event) {
    event.preventDefault();
    let itemName = $('#name').val();
    let quantity = $('#quantity').val();
    let newItem = document.createElement('li')

    if (Number.isNaN(parseInt(quantity, 10))) {
      quantity = '1';
    } 

    newItem.textContent = `${quantity} ${itemName}`;

    this.$list.append(newItem);
    this.$form.get(0).reset();
  }

  bindEvents() {
    this.$form.on("submit", this.addItem.bind(this));
  } 
}

$(function() {
  new GroceryList();
});