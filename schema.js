/**
 * This file is used to generate the postgresql database schema
 */
var pg = require('pg').native,
    connectionString = process.env.DATABASE_URL,    //This is set in the heroku environment
    client,
    query;

client = new pg.Client(connectionString);
client.connect();

//Create a new saved game table
query = client.query('CREATE TABLE games (user_id integer UNIQUE, population integer, pollution integer, power_demand integer, plants integer[])');
//TODO add user_id as a foreign key when we create a user table

query.on('end', function (result) {
    client.end();
});