// Use the XMLHttoRequest object to send requests using JS

let request = new XMLHttpRequest(); // Instantiate new XMLHttpRequest object
request.open('GET', '/path'); // Set HTTP method and the URL on request
request.send(); // Send request // asynchronous

// the code is sent from the local host

// the XMLHttpRequest object uses event listeners to send notifications when the request completes, and provides access to the response 

request.addEventListener('load', event => {
  let request = event.target;    // the XMLHttpRequest object 
                                 // use event.target to access request is not available in the outer scope

  request.responseText; // body of response
  request.status;       // status code of response
  request.statusText;   // status text from response

  request.getResponseHeader('Content-Type'); // response header
});