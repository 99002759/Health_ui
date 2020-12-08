var http = require('http');
  var sys = require('util');
  var fs = require('fs');
  
const express= require("express");
const app=express();
app.use(express.static("image"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
  })
app.get("/home.html", (req, res) => {
    res.sendFile(__dirname + "/home.html");
  })
app.get("/heart.html", (req, res) => {
    res.sendFile(__dirname + "/heart.html");
    })
    
app.get("/bp.html", (req, res) => {
        res.sendFile(__dirname + "/bp.html");
      })
app.get("/bo.html", (req, res) => {
        res.sendFile(__dirname + "/bo.html");
      })

       
app.listen(1239, () => {
    console.log("run");
  })
  
  
  
  http.createServer(function(req, res) {
    //debugHeaders(req);
  
    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
      if (req.url == '/time') {
        sendSSE(req, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(fs.readFileSync(__dirname + '/heart.html'));
      res.end();
    }
  }).listen(8000);
  console.log("running")
  
  function sendSSE(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });
  
    var id = (new Date()).toLocaleTimeString();
  
    // Sends a SSE every 5 seconds on a single connection.
    setInterval(function() {
      constructSSE(res, id, (new Date()).toLocaleTimeString());
    }, 5000);
  
    // constructSSE(res, id, (new Date()).toLocaleTimeString());
  }
  
  function constructSSE(res, id, data) {
    res.write('id: ' + id + '\n');
    res.write("data: " + data + '\n\n');
  }
  
  function debugHeaders(req) {
    sys.puts('URL: ' + req.url);
    for (var key in req.headers) {
      sys.puts(key + ': ' + req.headers[key]);
    }
    sys.puts('\n\n');
  }
  