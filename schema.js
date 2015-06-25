/**
 * This file is used to generate the postgresql database schema
 */
var pg = require('pg').native,
    connectionString = process.env.DATABASE_URL,    //This is set in the heroku environment
    client;

client = new pg.Client(connectionString);
client.connect();

var dropGamesQuery = client.query('DROP TABLE IF EXISTS games');
var dropUsersQuery = client.query('DROP TABLE IF EXISTS users');

//Create a user table to store all user info
var createUserQuery = client.query('CREATE TABLE users (user_id SERIAL PRIMARY KEY, user_email VARCHAR(255) UNIQUE, username VARCHAR(255), password text NOT NULL)');

//Create a new saved game table
var savedGamesQuery = client.query('CREATE TABLE games (user_id integer UNIQUE, population integer, pollution integer, power_demand integer, plants integer[])');

//TODO add user_id as a foreign key when we create a user table

createUserQuery.on('end', function (result) {
    console.log('User table created');
});

savedGamesQuery.on('end', function (result) {
    console.log('Table games created');
});

//Figure out what to do on errors. eg restart server