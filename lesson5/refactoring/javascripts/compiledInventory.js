"use strict";
let inventory;
(function () {
    let collection = [];
    let lastId = 0;
    function cacheTemplate() {
        var iTmpl = document.querySelector('#inventory_item');
        if (iTmpl) {
            let template = iTmpl.innerHTML;
            iTmpl.remove();
            return template;
        }
        else {
            throw new Error("Invalid selector");
        }
    }
    function findParent(e) {
        let tr = e.target.closest("tr");
        if (tr) {
            return tr;
        }
        else {
            throw new Error("Invalid Target: No parent element of the specified type");
        }
    }
    function findID(item) {
        let selected = item.querySelector("input[type=hidden]");
        if (selected) {
            return selected.value;
        }
        else {
            throw new Error("Invalid item");
        }
    }
    function itemExists(target) {
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
        collection.forEach(item => {
            if (item.id === Number(id)) {
                found_item = item;
            }
        });
        if (found_item) {
            return found_item;
        }
        else {
            throw new Error("Invalid Id");
        }
    }
    function setDate() {
        var date = new Date();
        let order = document.querySelector('#order_date');
        if (order) {
            order.textContent = date.toUTCString();
        }
        else {
            throw new Error("Invalid Selector");
        }
    }
    function updateProperty(itemDom, key) {
        let inputElement = itemDom.querySelector(`[name^=${key}]`);
        if (inputElement) {
            return inputElement.value;
        }
        else {
            throw new Error("Invalid Inputs: check values");
        }
    }
    inventory = {
        template: '',
        add: function () {
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
        remove: function (idx) {
            collection = collection.filter(function (item) {
                return item.id !== idx;
            });
        },
        update: function (item) {
            let itemDOM = item;
            let id = findID(item);
            let foundItem = get(id);
            foundItem.name = updateProperty(itemDOM, "item_name");
            foundItem.stock_number = updateProperty(itemDOM, "item_stock_number");
            foundItem.quantity = Number(updateProperty(itemDOM, "item_quantity"));
        },
        newItem: function (e) {
            e.preventDefault();
            let item = this.add();
            let newItemHTML = this.template.replace(/ID/g, String(item.id));
            let inventory = document.querySelector('#inventory');
            if (inventory) {
                inventory.insertAdjacentHTML("beforeend", newItemHTML);
            }
            else {
                throw new Error("Invalid Selector");
            }
        },
        deleteItem: function (e) {
            e.preventDefault();
            let item = findParent(e);
            this.remove(Number(findID(item)));
            item.remove();
        },
        updateItem: function (e) {
            let item = findParent(e);
            this.update(item);
        },
        bindEvents: function () {
            let add_item = document.querySelector('#add_item');
            let inventory = document.querySelector('#inventory');
            add_item.addEventListener("click", this.newItem.bind(this));
            inventory.addEventListener("click", (e) => {
                if (itemExists(e.target)) {
                    this.deleteItem(e);
                }
            });
            inventory.addEventListener("focusout", (e) => {
                if (e.target instanceof Element) {
                    let tagName = e.target.tagName;
                    if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tagName)) {
                        this.updateItem(e);
                    }
                }
                else {
                }
            });
        },
        init: function () {
            setDate();
            this.template = cacheTemplate();
            this.bindEvents();
        }
    };
})();
document.addEventListener("DOMContentLoaded", e => {
    inventory.init.bind(inventory)();
});