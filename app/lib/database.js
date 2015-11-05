var pg = require('pg');
var Promise = require('promise');

if (typeof process.env.DATABASE_URL === 'undefined') {
    console.error('Cannot find database connection string.');
}

module.exports = function(query, params) {
    return new Promise(function (resolve, reject) {
        pg.connect(process.env.DATABASE_URL, function (err, client, done) {
            
            if (err) {
                console.error('Error fetching client from pool.', err);
                reject(err);
            }
        
            client.query(query, params, function (err, result) {
                if (err) {
                    console.error('Error running query: '+ query +'.', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
            
        });
    });
};