var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

if (typeof process.env.NODE_ENV === 'undefined' || process.env.NODE_ENV === 'dev') {
    require('dotenv').load();
}

var projects = require('./app/routes/projects');

app.use('/projects', projects);

app.get('/', function (req, res) {
    res.redirect('/projects');
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Quasar listening on port '+ port +'.');
});