var inventory;
// Refactor from jQuery to vanilla JS

(function() {
  inventory = {
    lastId: 0,
    collection: [],
    setDate: function() {
      // Create date object
      // set text content for element to date string 
      var date = new Date();
      let orderDate = document.querySelector('#order_date');
      
      // $("#order_date").text(date.toUTCString());
      orderDate.textContent = date.toUTCString();
    },

    // creates a template for the table row
    // can refactor to use Handlebars 
    // cacheTemplate: function() {
      
    //   // when the program runs, remove the slected element and all nested elements
    //   // return removed element
    //   var $iTmpl = $("#inventory_item").remove();
      
    //   // set template property to removed element HTML
    //   this.template = $iTmpl.html();
    // },

    // add new item to collection
    add: function() {
      // increment id by 1
      this.lastId++;

      var item = {
        id: this.lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };

      // push new item to the collection array to store record
      this.collection.push(item);

      // reuturn new item
      return item;
    },

    // remove item by given id
    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    // retrieve an item by id or return false
    get: function(id) {
      var found_item;

      this.collection.forEach(function(item) {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },

    // update collection item when the input loses focus in the browser
    // expects table row 
    // update: function($item) {
    update: function(item) {

      // var id = this.findID($item),
      //     item = this.get(id);
      // attribute starts with selector
      let id = this.findID(item);
      item = this.get(id);

      // update the properties for the selected element
      // update the DOM with the input values for each field
      if (item) {
        // find the value of the descendant with matching selector
        // item.name = $item.find("[name^=item_name]").val();
        item.name = document.querySelector('[name^="item_name"]').value;
        
        // item.stock_number = $item.find("[name^=item_stock_number]").val();
        item.stock_number = document.querySelector('[name^="item_stock_number"]').value;  
        
        // item.quantity = $item.find("[name^=item_quantity]").val();
        item.quantity = document.querySelector('[name^=item_quantity]').value;
      }
    },

    // create new item, button listens on click
    newItem: function(e) {
      e.preventDefault();

      // add item to collection
      // var item = this.add(),
      let item = this.add();
      // globally replace ID with the new item id
      // we can do this dynamically with Handlebars template
      // $item = $(this.template.replace(/ID/g, item.id));
      
      // passing item object the template is populated with values referenced by embedded properties
      let newItem = template(item);
      
      // create new DOM element and set innerHTML to newItem
      let inventory = document.querySelector('#inventory');
      let tr = document.createElement('tr');
      tr.innerHTML = newItem;
      
      // append the newItem to the inventory table
      // $("#inventory").append($item);
      inventory.appendChild(tr);
    },

    // find the nearest tr element given an event
    findParent: function(e) {
      let closest = e.target
      // return $(e.target).closest("tr");
      let tr;
      while (!tr) {
                if (closest.nodeName === 'TR') {
          tr = closest;
        }
        closest = closest.parentNode;
      }
      return tr;
    },

    // find the id for the given item
    // findID: function($item) {
    findID: function(item) {
      // find item id for a given element
      // get the descendants of each element in the current set of matched elements filtered by a selector
      // attribute equals selector
      // get the id of the child element for item with type='hidden' property
      // coerce the string number to number
      // return +$item.find("input[type=hidden]").val();
      return +item.querySelector('input[type="hidden"]').value;  
    },

    // delete an item
    // called from an event lister
    // needs to check if event.target === "a.delete"
    deleteItem: function(e) {
      e.preventDefault();

      // if conditions are met
      if (e.target.nodeName === 'A' 
      && e.target.classList.contains('delete')) {
        // find the parent of the event, returns a table row, remove it and the elements it contains  
        // var $item = this.findParent(e).remove();
        let item = e.target.parentNode.parentNode;
          // located the id of the deleted item and remove its record from the collection
          // this.remove(this.findID($item));

          // remove the item from the collection
          this.remove(this.findID(item));

          // need to remove the item from the DOM
          item.remove()
      }

    },
    updateItem: function(e) {
      // find the closest tr for the given event target
      // var $item = this.findParent(e);
      // loop from target to tr
      let item = this.findParent(e);
      
      // update the table
      // this.update($item);
      this.update(item);
    },

    // bind events to Add Item button, and the inventory table which listens for clicks on a.delete, and also when the inventory table element loses focus(on "blur")
    bindEvents: function() {
      // add event Lister on #add_item
      // listen on click
      // call this.new item with this as context object
      // $("#add_item").on("click", $.proxy(this.newItem, this));
      let add_item = document.querySelector('#add_item');
      let inventory = document.querySelector('#inventory');      

      add_item.addEventListener('click', this.newItem.bind(this));

      // calls delete item
      // listens on click, specifically on a.delete
      // $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
      // need to refactor delete item to check if the event has "a.delete" as its target
      inventory.addEventListener('click', this.deleteItem.bind(this))

      
      // calls update item
      // need to refactor to update inventory automatically when we've deleted an item
      // $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
      inventory.addEventListener('focusout', this.updateItem.bind(this));
    },

    // we set the date, cache the template, and bind events
    init: function() {
      this.setDate();
      // rather than cache the template, we can simply render the element when we add new elements
      // this.cacheTemplate();
      this.bindEvents();
    }
  };
})();

// equivalent to a DOMContentLoaded event listener
// takes a function which executes when the event fires
// proxy binds function to a given context which can be achieved with Function.prototype.bind
// $($.proxy(inventory.init, inventory));

document.addEventListener('DOMContentLoaded', inventory.init.bind(inventory));
