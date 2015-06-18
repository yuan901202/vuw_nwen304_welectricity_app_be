/**
 * This file is used to generate the postgresql database schema
 */
var pg = require('pg').native,
    connectionString = process.env.DATABASE_URL,    //This is set in the heroku environment
    client;

client = new pg.Client(connectionString);
client.connect();

//Power source data
var powerSource = [
	{"name": "wind", "power": "20", "cost": "30", "pollute": "10"},
	{"name": "hydropower", "power": "35", "cost": "27", "pollute": "10"},
	{"name": "coal", "power": "100", "cost": "99", "pollute": "100"},
	{"name": "oil", "power": "20", "cost": "10", "pollute": "60"},
	{"name": "gas", "power": "80", "cost": "18", "pollute": "40"},
	{"name": "unclear", "power": "60", "cost": "45", "pollute": "40"},
	{"name": "solar", "power": "20", "cost": "28", "pollute": "10"},
];

var dropGamesQuery = client.query('DROP TABLE IF EXISTS games');
var dropUsersQuery = client.query('DROP TABLE IF EXISTS users');
var gameDataQuery = client.query('DROP TABLE IF EXISTS sourceData');

//Create a user table to store all user info
var createUserQuery = client.query('CREATE TABLE users (user_id SERIAL PRIMARY KEY, user_email VARCHAR(255) UNIQUE, username VARCHAR(255), password text NOT NULL)');

//Create a new saved game table
var savedGamesQuery = client.query('CREATE TABLE games (user_id integer UNIQUE, population integer, pollution integer, power_demand integer, plants integer[])');

//Create a game data table to store all data resources
var storeDataQuery = client.query('CREATE TABLE sourceData (source_id SERIAL PRIMARY KEY, source_name VARCHAR(20), source_power integer, source_cost integer, source_pollute integer)');

//TODO add user_id as a foreign key when we create a user table

//Put power source data into table
for (var id = 0; id < 7; id++) {
	storeDataQuery = client.query('INSERT INTO sourceData (source_id, source_name, source_power, source_cost, source_pollute) VALUES($1, $2, $3, $4, $5)', [id, powerSource[id].name, powerSource[id].power, powerSource[id].cost, powerSource[id].pollute]);
}

createUserQuery.on('end', function (result) {
    console.log('User table created');
});

savedGamesQuery.on('end', function (result) {
    client.end();
    console.log('Table games created');
});

storeDataQuery.on('end', function (result) {
	client.end();
	console.log('Game data stored');
});

//Figure out what to do on errors. eg restart server


