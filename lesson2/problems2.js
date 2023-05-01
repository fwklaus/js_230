// function startCounting() {
//   let number = 1;
//   const MILLISECONDS_PER_SECOND = 1000;

//   let logger = () => console.log(number++)
//   let id = setInterval(logger, MILLISECONDS_PER_SECOND);
//   return id;
// }

// let id = startCounting(); 

// function stopCounting() {
//   clearInterval(id);
// }


// setTimeout(stopCounting, 10000);



function startCounting() {
  let n = 1;

  return setInterval(() => {
    console.log(n);
    n += 1
  }, 1000)
}

let count = startCounting();

function stopCounting() {
  clearInterval(count)
}

setTimeout(stopCounting, 7000);