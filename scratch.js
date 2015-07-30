var fs   = require('fs');
var http = require('http');
var url  = require('url');
var port = 3001;
var server = http.createServer();
var sightingsDB = JSON.parse(fs.readFileSync('sightings.json', 'utf8'));


server.on('request', function(request, response) {
  var requestUrl = request.url;
  var urlObject = url.parse(requestUrl);
  var pathname = urlObject.pathname;
  var query    = urlObject.query;
  var multiplevalues = [];
  // console.log(pathname);
  // console.log(query);

  var getLocation = function getLocation(){
    sightingsDB.forEach(function(sighting) {
      if (sighting.location.toLowerCase().indexOf(query[1].toLowerCase())!==-1) {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(sighting));
        response.end();
      }
    });
  }

  if (pathname === '/') {
    if (query.toString().indexOf("&")> -1){
        query = query.split("&")
    } else if(query) {
      console.log(query);
      query = query.split("=");
      if(query[0] === "loc") {
          getLocation()
      } else if (query[0]=== "id"){
        var test = parseInt(query[1]);
        sightingsDB.forEach(function (sighting){
          if (sighting.id === test){
            response.writeHead(200, {'Content-Type': 'application/json'});
            var currentinstance = JSON.stringify(sighting);
            multiplevalues.push(currentinstance);
            response.write(multiplevalues);
            response.end();
          }
        })

      } else if (query[0]=== "date"){
        var test = parseInt(query[1]);
        sightingsDB.forEach(function (sighting){
          if (sighting.date === test){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(sighting));
            response.end();
          }
        })

      } else if (query[0]=== "shape"){
        var test = parseInt(query[1]);
        sightingsDB.forEach(function (sighting){
          if (sighting.date === test){
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.write(JSON.stringify(sighting));
            response.end();
          }
        })

      }


    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write('Welcome to the Tom Cruise Database');
      response.end();
    }


  } else {

  }


});

server.listen(port, function() {
  console.log('Yes, I am listening on port', port);
});

