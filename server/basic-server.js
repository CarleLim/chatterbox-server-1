var requestHandler = require('./request-handler.js');

/* Import node's http module: */
var http = require("http");
var url = require('url');


var port = 3000;

var ip = "127.0.0.1";

var room = '/classes/room1';

var res;

var req;



var server = http.createServer(function(req, res){

  var urlObj = url.parse(req.url)

  console.log(urlObj);

  if (urlObj.pathname.indexOf('classes') > -1){
    requestHandler.requestHandler(req,res);
  } else {
    res.writeHead(404, requestHandler.defaultCorsHeaders);
    res.end(null);
  }

});

console.log("Listening on http://" + ip + ":" + port);

server.listen(port, ip);

// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.


