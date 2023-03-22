// Create a Promise that resolves with a value of "Launch School" after a delay of 2000ms, using setTimeout. Print the Promise's resolved value by using the then method.

new Promise( (resolve, reject) => {
  setTimeout(() => { resolve('Launch School') }, 2000);
}).then( message => {
  console.log(message);
});

// Create a Promise that rejects with a value of "Error: Not Launch School" after a delay of 2000ms, using setTimeout. Print the Promise's rejected value by using the .catch method.​


const promise = new Promise( (resolve, reject) => {
  setTimeout(() => { reject('Error: Not Launch School')}, 2000);
});

promise.catch(error => {
  console.log(error);
});

// Without running it, what will the following code log to the console?
/*
const promise = new Promise(function (resolve, reject) {
  resolve("I am a Promise");
});
​
promise.then(value => console.log(value));
console.log("I am NOT a Promise");

output: 
I am NOT a promise
I am a promise

Promises are asynchronous. In this case, the code in the promise is processed in the Web API and pushed to the job queue. The code on the last line is output `I am NOT a Promise`, and when the event loop sees that the call stack is empty, it pops the first message off the job queue and pushes it to the call stack where runtime executes the second message `I am a Promise`
*/


/*
const promise1 = new Promise((resolve, reject) => {
  console.log("foo");
  resolve();
  console.log("bar");
});

promise1.then(() => {
  console.log("baz");
});

console.log("qux");

output:
foo
bar
qux
baz
*/


/*
const promise = new Promise((resolve, reject) => {
  console.log("foo");
  reject();
  console.log("bar");
});

promise
  .then(() => {
    console.log("baz");
  })
  .catch(() => {
    console.log("qux");
  });

console.log("abc");

output:
foo
bar
abc
qux
*/

/*
const promise = new Promise(res => res(1));
promise
  .then((num) => {
    console.log(num);
    return num + 2;
  })
  .then((num) => {
    console.log(num);
    return num + 3;
  })
  .then((num) => {
    console.log(num);
    return num + 4;
  })
  .finally((num) => {
    console.log(num);
    return num + 5;
  });

output -> 1 3 6
*/

/*
const promise = new Promise((resolve, reject) => {
  resolve("Got it!");
  reject("Oops.");
  resolve("Again!");
});

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

output:
Got it!

*/

/*
function after1s(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

async function test(input) {
  const a = await after1s(2);
  const b = await after1s(3);
  return input * a * b;
}

test(3).then((value) => console.log(value));

output:
18

*/

/*
function after1s(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, 1000);
  });
}

async function test(input) {
  const a = await after1s(2);
  const b = await after1s(3);
  return input * (await a) * (await b);
}

test(3).then((value) => console.log(value));

output:
Same output as before. The await keywords signify that we're waiting for the action to be resolved before the next statement is processed. The await keyord has no effect here since values a and b are already resolved

18
*/

/*
function after1s(x, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x);
    }, ms);
  });
}

async function test1(input) {
  const a = await after1s(2, 2000);
  const b = await after1s(3, 2000);
  return input * a * b;
}

async function test2(input) {
  const a = await after1s(2, 1000);
  const b = await after1s(3, 1000);
  return input * a * b;
}

test1(2).then((value) => console.log(value));
test2(3).then((value) => console.log(value));


output:
18 - from test2
12 - from test1
*/


/*
const testPromise = () => Promise.resolve("1");

function test1() {
  testPromise().then((result) => console.log(result));
  console.log("2");
}

function test2() {
  console.log("3");
}

test1();
test2();

output:
2
3
1

*/

/*
const test = Promise.resolve("A");

(async () => {
  try {
    console.log(await test);
  } catch {
    console.log("E");
  } finally {
    console.log("B");
  }
})();

output:
A
B
*/

/*
const test = Promise.reject("A");

(async () => {
  try {
    console.log(await test);
  } catch {
    console.log("E");
  } finally {
    console.log("B");
  }
})();

output:
E
B

*/
