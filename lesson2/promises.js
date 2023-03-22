// If we try to create a promise without an executor function, we get an error
try {
const promise = new Promise(); 
} catch(err) {
  console.log(err.name + ': ' + err.message); 
  // TypeError: Promise resolver undefined is not a function
}

// A promise requires that we pass in a function(executor function) that takes up to two arguments (resolve and reject)
promise = new Promise((resolve, reject) => {
  //...
})
console.log(typeof promise); // object
console.log(promise instanceof Promise); // true

// The rejection callback is optional
let promise2 = new Promise(resolve => {});
console.log(promise2 instanceof Promise); // true

// Eventually, a promise returns an promise object which faciliates promise chaining
let promise3 = new Promise((resolve, reject) => {
  let num = 2 + 2;
  if (num === 4) {
    resolve("All is well")
  } else {
    reject("It's happening again...")
  }
});

promise3.then(result => {
  console.log(result);
})

// If a promise is rejected, the entire promise chain is still executed. The promise chain relies on the catch to handle it

let promise4 = new Promise((resolve, reject) => {
  reject("It's happening again...");
}).then(success => {
  console.log(success);
}).catch(error => {
  console.log(error)
});

// The eventual value that the promise returns can be of any type

let promise5 = new Promise((resolve, reject) => {
  setTimeout(() => { resolve(5) }, 5000);
});

promise5.then(val => {
  console.log(val);        // 5
  console.log(typeof val); // number
});
