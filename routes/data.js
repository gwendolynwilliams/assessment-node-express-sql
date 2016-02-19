var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

//tried separating out my data routes here and couldn't get it to work.

router.get('/', function(req, res) {

    var results = [];

    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM animals');

        //Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        //close connection
        query.on('end', function() {
            client.end();
            console.log(results);
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }

    });
});

router.post('/', function(req, res) {

    var addAnimal = {
        animal_type: req.body.animal_type
    };

    var number = randomNumber(1, 100);

    pg.connect(connectionString, function(err, client, done) {
        client.query('INSERT INTO animals (animal_type, number_of_animals) VALUES ($1, $2);',
            [addAnimal.animal_type, number],
            function(err, result) {
                done();
                if(err) {
                    console.log('Error inserting data: ', err);
                    res.send(false);
                } else {
                    //console.log(res[0]['person_id']);
                    res.send(addAnimal);
                }
            });
    });
});

module.exports = router;