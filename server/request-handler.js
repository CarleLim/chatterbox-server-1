

var dispatcher = require('httpdispatcher');
var fs = require("fs");
var db = require('./db.js');
//need to make a file to save info from post requests
//use fs.write (or fs.writefile) to append the file when necessary

var requestHandler = function(request, response) {

  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "text/plain";

  if( request.method === 'POST'){
    fs.appendFile('db.js', 'NEW data to append', function(){
    })

    response.end();
  }


  if(request.method === 'GET'){
    //if (request.url === '/'){
      response.writeHead(statusCode, headers);

      var obj = {createdAt: 4324232,text: "string blah blah blah",username: "string",roomname: "roomname"};
      console.log(obj);
      response.end(JSON.stringify(obj));
    //}
  }


};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;