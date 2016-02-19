var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
//var data = require('./routes/data');  //tried using this for data route

var randomNumber = require('./routes/randomNumber');

var pg = require('pg');
var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/Gwen';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

//app.use('/data', data); //tried using this for data route - ended up leaving my data routes in this file

app.post('/animals', function(req, res) {

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

app.get('/animals', function(req, res) {

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

app.get('/*', function(req, res) {
    //request and response
    console.log('here is the request: ', req.params);
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function() {
    console.log('Server is ready on port ' + app.get('port'));
});
