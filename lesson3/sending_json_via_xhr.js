let request = new XMLHttpRequest();
request.open('POST', 'https://lsjs230-book-catalog.herokuapp.com/books');

request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

let data = { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' };
let json = JSON.stringify(data);

request.send(json);

/*
// raw text of the above HTTP request
// Accept value is escaped to preserve multi-line comment

POST /books HTTP/1.1
Host: lsjs230-book-catalog.herokuapp.com
Content-Type: 'application/json; charset=utf-8  
Accept: *\/*

{"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}
*/
