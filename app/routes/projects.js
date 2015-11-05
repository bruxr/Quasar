var express = require('express');
var router = express.Router();

var validate = require('../lib/validate');
var query = require('../lib/database');

router.get('/', function (req, res) {
    
});

router.post('/', function (req, res) {
    
    var validation = validate(req.body, {
        alias:  'required|max:100',
        name:   'required|max:255',
        url:    'required|url'
    });
    
    var alias = req.body.alias.trim();
    var name = req.body.name.trim();
    var url = req.body.url.trim();
    
    if ( validation.passes ) {
        query('INSERT INTO projects (alias, name, url) VALUES ($1, $2, $3)', [alias, name, url])
            .then(function () {
                res.status(201)
                   .json({
                        alias: alias,
                        name: name,
                        url: url
                   });
            }, function () {
                res.status(500);
            });
    } else {
        res.status(400)
           .json({
               error: validation.errors
           });
    }
    
});

module.exports = router;