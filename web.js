/*global require console process __dirname*/
var express = require('express'),
    fs = require('fs'),
    lessMiddleware = require('less-middleware');

var app = express.createServer(express.logger());
var oneDay = 86400000;

app.get('/', function(request, response) {
    response.send(fs.readFileSync('index.html', 'utf8'));
});

app.configure(function(){
    app.use(lessMiddleware({
        src      : __dirname + "/public",
        compress : true
    }));
    app.use(express['static'](__dirname + '/public', { maxAge: oneDay }));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});