

var dispatcher = require('httpdispatcher');
var fs = require("fs");
//var db = require('./db.js');


var db = [

  {
    createdAt: 4324232,
    text: "string blah blah blah",
    username: "string",
    roomname: "roomname"
  },

  {
    createdAt: 4324232,
    text: "second string!!!",
    username: "this is from object #2",
    roomname: "roomname"
  }

]


var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "plain/text";


  if( request.method === 'OPTIONS'){
    response.writeHead(statusCode, headers);
    response.end();
  }

  if(request.method === 'POST'){
    response.writeHead(statusCode, headers);

    var accumulatedData = [];

    request.on('data', function(chunk){
      accumulatedData.push(chunk)
    }).on('end', function(){
      accumulatedData = Buffer.concat(accumulatedData).toString();
      db.push(JSON.parse(accumulatedData));
      console.log(db);
    })

    response.end();

  }

  if(request.method === 'GET'){

      response.writeHead(statusCode, headers);

      var obj = {results:db}

      response.end(JSON.stringify(obj));

  }

};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;
