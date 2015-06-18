//Application: welectricity-ninja-hertz
//Author: Ninja-hertz

var express = require('express');
//var helmat = require('helmat');

//added cors
var app = express(),
    cors = require('cors'),
    pg = require('pg').native,
    connectionString = process.env.DATABASE_URL,    //This is set in the heroku environment
    client,
    query,
    hasher = require('password-hash-and-salt');

//login token session by passport
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(cors());
//app.use(helmat());

client = new pg.Client(connectionString);
client.connect();


var server = app.listen(process.env.PORT, function () {
    console.log('Listening on port %d', server.address().port);
});

//Create a new user
app.post('/user/create', function (req, res) {
    if(!req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('username')) {
        res.statusCode = 400;
        return res.send('Error 400: your request is missing some required data');
    }

    //Verify email is not already set
    var userExistsQuery = client.query('SELECT COUNT(*) as count FROM users WHERE user_email = $1', [req.body.email]);

    userExistsQuery.on('end', function (results) {

        //If email is already in the database
        if (results.rows[0].count > 0) {
            res.statusCode = 409;
            return res.send('A user with this email already exists');
        }

        //Create user password hash
        hasher(req.body.password).hash(function (error, hash) {
            if(error) {
                res.statusCode = 500;
                return res.send("Error 500: An unknown server error has occurred");
            }

            //store new user in database
            var createUserQuery = client.query('INSERT INTO users(user_email, username, password) VALUES($1, $2, $3)', [req.body.email, req.body.username, hash]);

            createUserQuery.on('end', function (result) {
                res.statusCode = 201;
                res.send('User created successfully');
            });

            createUserQuery.on('error', function (error) {
                res.statusCode = 500;
                res.send('Error 500: ' + error);
            });
        });
    });

    userExistsQuery.on('error', function (error) {
        console.log(error);
        res.statusCode = 500;
        res.send("Error 500: An unknown server error has occurred");
    })
});

//Save a game
app.post('/game', function (req, res) {

    //Validate the request
    if (!req.body.hasOwnProperty('user_id') || !req.body.hasOwnProperty('population') || !req.body.hasOwnProperty('pollution') || !req.body.hasOwnProperty('power_demand') || !req.body.hasOwnProperty('plants')) {
        res.statusCode = 400;
        return res.send('Error 400: your request is missing some required data');
    }
    var game = req.body;

    //TODO validate the saved game. i.e user_id exists. This can be done when we know what the range of values for the above can be.

    var gameExistsQuery = client.query('SELECT COUNT(*) AS count FROM games WHERE user_id = $1', [req.body.user_id]);

    gameExistsQuery.on('end', function (results) {
        if (results.rows[0].count > 0) {
            //A save game for this user does exist so UPDATE it
            var updateSave = client.query('UPDATE games SET population=$1, pollution=$2, power_demand=$3, plants=$4 WHERE user_id=$5', [game.population, game.pollution, game.power_demand, game.plants, game.user_id]);

            handleSaveQuery(res, client, updateSave);
        } else {
            //A save game for this user does not exist so INSERT it
            var createSave = client.query('INSERT INTO games VALUES($1, $2, $3, $4, $5)', [game.user_id, game.population, game.pollution, game.power_demand, game.plants]);

            handleSaveQuery(res, client, createSave);
        }
    });

    gameExistsQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//Get a saved game
app.get('/game/:userid', function (req, res) {
    if (!req.params.hasOwnProperty('userid')) {
        res.statusCode = 400;
        return res.send('Error 400: user id is required');
    }

    var loadGameQuery = client.query('SELECT * FROM games WHERE user_id = $1', [req.params.userid]);

    loadGameQuery.on('end', function (result) {
        if(result.rows.length <= 0) {
            res.statusCode = 404;
            return res.send('Error 404: No saved game found for that user');
        }

        res.statusCode = 200;
        res.send(result.rows[0]);
    });

    loadGameQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET one user data except password
app.get('/user/:userid', function (req, res) {
    if (!req.params.hasOwnProperty('userid')) {
        res.statusCode = 400;
        return res.send('Error 400: user id is required');
    }

    var loadUserQuery = client.query('SELECT user_id, user_email, username FROM users WHERE user_id = $1', [req.params.userid]);

    loadUserQuery.on('end', function (result) {
        if(result.rows.length <= 0) {
            res.statusCode = 404;
            return res.send('Error 404: user not exist');
        }

        res.statusCode = 200;
        res.send(result.rows[0]);
    });

    loadUserQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET all users data except password
app.get('/allusers', function (req, res) {
    var loadUserQuery = client.query('SELECT user_id, user_email, username FROM users');

    loadUserQuery.on('end', function (result) {
        console.log(result);
        if (!result) {
            res.statusCode = 404;
            return res.send('NO data found');
        }
        else {
            res.send(result);
        }
    });

    loadUserQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET power source -> power
app.get('/:dataid/power', function (req, res) {
    if (!req.params.hasOwnProperty('dataid')) {
        res.statusCode = 400;
        return res.send('Error 400: data id is required');
    }

    var readDataQuery = client.query('SELECT source_power FROM sourceData WHERE source_id = $1', [req.params.dataid]);

    readDataQuery.on('end', function (result) {
        console.log(result);
        if (!result) {
            res.statusCode = 404;
            return res.send('NO data found');
        }
        else {
            res.send(result);
        }
    });

    readDataQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET power source -> cost
app.get('/:dataid/cost', function (req, res) {
    if (!req.params.hasOwnProperty('dataid')) {
        res.statusCode = 400;
        return res.send('Error 400: data id is required');
    }

    var readDataQuery = client.query('SELECT source_cost FROM sourceData WHERE source_id = $1', [req.params.dataid]);

    readDataQuery.on('end', function (result) {
        console.log(result);
        if (!result) {
            res.statusCode = 404;
            return res.send('NO data found');
        }
        else {
            res.send(result);
        }
    });

    readDataQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET power source -> pollution
app.get('/:dataid/pollute', function (req, res) {
    if (!req.params.hasOwnProperty('dataid')) {
        res.statusCode = 400;
        return res.send('Error 400: data id is required');
    }

    var readDataQuery = client.query('SELECT source_pollute FROM sourceData WHERE source_id = $1', [req.params.dataid]);

    readDataQuery.on('end', function (result) {
        console.log(result);
        if (!result) {
            res.statusCode = 404;
            return res.send('NO data found');
        }
        else {
            res.send(result);
        }
    });

    readDataQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET all power source data
app.get('/allsources', function (req, res) {
    var readDataQuery = client.query('SELECT * FROM sourceData');

    readDataQuery.on('end', function (result) {
        console.log(result);
        if (!result) {
            res.statusCode = 404;
            return res.send('NO data found');
        }
        else {
            res.send(result);
        }
    });

    readDataQuery.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

/**
<<<<<<< HEAD
 * A function to handle a save savedGamesQuery
 *
 * @param res - The response object
 * @param client - The db client
 * @param query - The savedGamesQuery that is attempting to save a game
=======
 * A function to handle a save query
 *
 * @param res - The response object
 * @param client - The db client
 * @param query - The query that is attempting to save a game
>>>>>>> feature-saveLoadGame
 */
function handleSaveQuery(res, client, query) {
    query.on('end', function (result) {
        res.statusCode = 200;
        res.send('Game saved successfully');
    });

    query.on('error', function (error) {
        res.statusCode = 500;
        res.send('Error 500: An unexpected error has occurred. Details: ' + error);
    });
}

