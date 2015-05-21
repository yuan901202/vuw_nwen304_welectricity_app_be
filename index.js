//Application: welectricity-ninja-hertz
//Author: Ninja-hertz

var express = require('express');

//added cors
var app = express(),
    cors = require('cors'),
    pg = require('pg').native,
    connectionString = process.env.DATABASE_URL,    //This is set in the heroku environment
    client,
    query;

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(cors());

client = new pg.Client(connectionString);



var server = app.listen(process.env.PORT, function () {
    console.log('Listening on port %d', server.address().port);
});

//Save a game
app.post('/game', function (req, res) {
    client.connect();

    //Validate the request
    if (!req.body.hasOwnProperty('user_id') || !req.body.hasOwnProperty('population') || !req.body.hasOwnProperty('pollution') || !req.body.hasOwnProperty('power_demand') || !req.body.hasOwnProperty('plants')) {
        res.statusCode = 400;
        return res.send('Error 400: your request is missing some required data');
    }
    var game = req.body;

    //TODO validate the saved game. i.e user_id exists.

    var gameExistsQuery = client.query('SELECT COUNT(*) AS count FROM games WHERE user_id = $1', [req.body.user_id]);

    gameExistsQuery.on('end', function (results) {
        if (results.rows[0].count > 0) {
            //A save game for this user does exist so UPDATE it
            var updateSave = client.query('UPDATE games SET population=$1, power_demand=$2, plants=$3 WHERE user_id=$4', [game.population, game.pollution, game.power_demand, game.plants, game.user_id]);

            handleSaveQuery(res, client, updateSave);
        } else {
            //A save game for this user does not exist so INSERT it
            var createSave = client.query('INSERT INTO games', [game.user_id, game.population, game.pollution, game.power_demand, game.plants]);

            handleSaveQuery(res, client, createSave);
        }
    });
});

//Get a saved game
app.get('/game/:userid', function (req, res) {
    if (!req.params.hasOwnProperty('userid')) {
        res.statusCode = 400;
        return res.send('Error 400; user id is required');
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

    loadGameQuery.on('error', function(error) {
        res.statusCode = 500;
        res.send('Error 500: ' + error);
    });
});

//GET hydropower
app.get('/hydropower/:id/power', function (req, res) {
    if (hydropower.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(hydropower[req.params.id].power);
});

app.get('/hydropower/:id/cost', function (req, res) {
    if (hydropower.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(hydropower[req.params.id].cost);
});

app.get('/hydropower/:id/pollute', function (req, res) {
    if (hydropower.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(hydropower[req.params.id].pollute);
});

//GET coal
app.get('/coal/:id/power', function (req, res) {
    if (coal.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(coal[req.params.id].power);
});

app.get('/coal/:id/cost', function (req, res) {
    if (coal.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(coal[req.params.id].cost);
});

app.get('/coal/:id/pollute', function (req, res) {
    if (coal.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(coal[req.params.id].pollute);
});

//GET oil
app.get('/oil/:id/power', function (req, res) {
    if (oil.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(oil[req.params.id].power);
});

app.get('/oil/:id/cost', function (req, res) {
    if (oil.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(oil[req.params.id].cost);
});

app.get('/oil/:id/pollute', function (req, res) {
    if (oil.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(oil[req.params.id].pollute);
});

//GET gas
app.get('/gas/:id/power', function (req, res) {
    if (gas.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(gas[req.params.id].power);
});

app.get('/gas/:id/cost', function (req, res) {
    if (gas.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(gas[req.params.id].cost);
});

app.get('/gas/:id/pollute', function (req, res) {
    if (gas.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(gas[req.params.id].pollute);
});

//GET genthermal
app.get('/genthermal/:id/power', function (req, res) {
    if (genthermal.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(genthermal[req.params.id].power);
});

app.get('/genthermal/:id/cost', function (req, res) {
    if (genthermal.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(genthermal[req.params.id].cost);
});

app.get('/genthermal/:id/pollute', function (req, res) {
    if (genthermal.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(genthermal[req.params.id].pollute);
});

//GET nuclear
app.get('/nuclear/:id/power', function (req, res) {
    if (nuclear.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(nuclear[req.params.id].power);
});

app.get('/nuclear/:id/cost', function (req, res) {
    if (nuclear.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(nuclear[req.params.id].cost);
});

app.get('/nuclear/:id/pollute', function (req, res) {
    if (nuclear.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(nuclear[req.params.id].pollute);
});

//GET solar
app.get('/solar/:id/power', function (req, res) {
    if (solar.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(solar[req.params.id].power);
});

app.get('/solar/:id/cost', function (req, res) {
    if (solar.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(solar[req.params.id].cost);
});

app.get('/solar/:id/pollute', function (req, res) {
    if (solar.length <= req.params.id || req.params.id < 0) {
        res.statusCode = 404;
        return res.send('Error 404: No data found');
    }
    res.send(solar[req.params.id].pollute);
});

/**
 * A function to handle a save query
 *
 * @param res - The response object
 * @param client - The db client
 * @param query - The query that is attempting to save a game
 */
function handleSaveQuery(res, client, query) {
    query.on('end', function (result) {
        client.end();
        res.statusCode = 200;
        res.send('Game saved successfully');
    });

    query.on('error', function (error) {
        client.end();
        res.statusCode = 500;
        res.send('Error 500: An unexpected error has occurred. Details: ' + error);
    });
}

//data
//(0) close to hill
//(1) close to river
//(2) close to residential area
//(3) close to valley
var hydropower = [
    {power: '2000', cost: '200', pollute: '200'},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];

var coal = [
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];

var oil = [
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];

var gas = [
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];

var genthermal = [
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];

var unclear = [
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];

var solar = [
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''},
    {power: '', cost: '', pollute: ''}
];