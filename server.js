require('dotenv').load();
var express = require('express');
var https = require('https');
var http  = require('http');
var fs = require('fs');

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require ("./setup/app.js")(app);
/*
var options = {
    key: fs.readFileSync('setup/keys/agent2-key.pem'),
    cert: fs.readFileSync('setup/keys/agent2-cert.pem')
};
*/

var server = require('./server/app.js');
server(app);

//https.createServer(options, app).listen(8443);
http.createServer(function (req, res) {
    site= req.headers['host'];
    site = site.split(':')[0];
    site=site+':8443';
    res.writeHead(301, { "Location": "http://" + site + req.url });
    res.end();
}).listen(9000);