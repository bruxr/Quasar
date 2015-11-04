var express = require('express');
var app = express();

var gatekeeper = require('app/middleware/gatekeeper');
app.use(gatekeeper);