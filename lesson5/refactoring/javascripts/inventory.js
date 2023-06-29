var inventory;

(function() {
  let collection = [];
  let lastId = 0;

  function cacheTemplate() {
    var iTmpl = document.querySelector('#inventory_item');
    let template = iTmpl.innerHTML; 
    iTmpl.remove();
    return template;
  }

  function findParent(e) {
      return e.target.closest("tr");
  }

  function findID(item) {
    return item.querySelector("input[type=hidden]").value;
  }

  function item(target) {    
    let items = document.querySelectorAll('a.delete');
  
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item === target) {
        return true;
      }
    } 
  
    return false;
  }

  function get(id) {
    let found_item;
  
    collection.forEach(function(item) {
      if (item.id === Number(id)) {
        found_item = item;
      }
    });
      
    return found_item;
  }

  function setDate() {
      var date = new Date();
      document.querySelector('#order_date').textContent = date.toUTCString();
  }

  inventory = {
    add: function() {
      lastId++;
      var item = {
        id: lastId,
        name: "",
        stock_number: "",
        quantity: 1
      };
      collection.push(item);
  
      return item;
    },
    remove: function(idx) {
      collection = collection.filter(function(item) {
        return item.id !== idx;
      });
    },
    update: function(item) {
      let itemDOM = item;
  
      let id = findID(item);
      item = get(id)
  
      item.name = itemDOM.querySelector("[name^=item_name]").value;
      item.stock_number = itemDOM.querySelector("[name^=item_stock_number]").value;
      item.quantity = itemDOM.querySelector("[name^=item_quantity]").value;
    },
    newItem: function(e) {
      e.preventDefault();
      let item = this.add();
      item = this.template.replace(/ID/g, item.id);
  
      document.querySelector('#inventory').insertAdjacentHTML("beforeend", item);
    },
    deleteItem: function(e) {
      e.preventDefault();
  
      let item = findParent(e)
      this.remove(findID(item));
      item.remove();
    },
    updateItem: function(e) {
      let item = findParent(e);
      this.update(item);
    },
    bindEvents: function() {
      let add_item = document.querySelector('#add_item');
      let inventory = document.querySelector('#inventory');
      add_item.addEventListener("click", this.newItem.bind(this));
      inventory.addEventListener("click", (e) => {
        if (item(e.target)) {
          this.deleteItem(e);
        }
      });
  
      inventory.addEventListener("focusout", (e) => {
       if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(e.target.tagName)) {
          this.updateItem(e);
       }
      });
    },
    init: function() {
      setDate();
      this.template = cacheTemplate();
      this.bindEvents();
    }
  };
})();

document.addEventListener("DOMContentLoaded", e => {
  inventory.init.bind(inventory)();
});
