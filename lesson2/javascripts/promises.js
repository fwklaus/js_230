document.addEventListener('DOMContentLoaded', e => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Launch School")
    }, 2000);
  })
  
  myPromise.then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  });

  const rejected = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Error: Not Launch School');
    }, 2000);
  });

  rejected.then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
});
