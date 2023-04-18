//Modern browsers provide native support for fetching JSON data
// we use the responseType property to tell the browser how to handle data it receives

let request = new XMLHttpRequest();
request.open('GET', 'https://api.github.com/repos/rails/rails');
request.responseType = 'json'

request.addEventListener('load', event => {
  // let data = JSON.parse(request.response);
  // request response will be the result of parsing the JSON response body or null if the body coultn't be parsed or another error occured
  // we leave error-handling to responseType, which returns a value, or not 
  let data = request.response;


  // do something with data
});

request.send();