// recursion with an array
// loop (non-recursive solution)
function iterateAndLog(array) {
  for (let index = 0; index < array.length; index += 1) {
    console.log(array[index]);
  }
}

let letters = ['h', 'e', 'l', 'l', 'o'];
iterateAndLog(letters);
// h
// e
// l
// l
// o

// solution with recursion
// recursion can replace a loop to perform the same functionality

function recurseAndLog(array) {
  if (array.length > 0) {
    console.log(array[0]);
    recurseAndLog(array.slice(1));
  }
}

recurseAndLog(letters);
// h
// e
// l
// l
// o

// w/ walking the tree, we use DOM nodes, rather than an array 
// each arument in the recursive chain is the child of the current node

function walk(node) {
  console.log(node.nodeName);                                       // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index]);                                   // recursively call walk()
  }
}

walk(document.body);                                                // log nodeName of every node

// better solution
// walk() calls the function "callback" once for each node
function walk(node, callback) {
  callback(node);                                                   // do something with node
  for (let index = 0; index < node.childNodes.length; index += 1) { // for each child node
    walk(node.childNodes[index], callback);                         // recursively call walk()
  }
}

walk(document.body, node => {                                // log nodeName of every node
  console.log(node.nodeName);
});